import mysql from 'mysql2/promise';

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const userId = 30037;

try {
  // Удаляем старые транзакции
  await connection.execute('DELETE FROM transactions WHERE userId = ?', [userId]);
  console.log('Старые транзакции удалены');

  // Получаем все бронирования пользователя
  const [bookings] = await connection.execute(
    'SELECT id, workspaceId, totalPrice, startTime, status FROM bookings WHERE userId = ? ORDER BY startTime',
    [userId]
  );

  console.log(`Найдено ${bookings.length} бронирований`);

  // Создаем транзакцию пополнения баланса (достаточно для покрытия всех расходов)
  const totalExpenses = bookings.reduce((sum, b) => sum + Number(b.totalPrice), 0);
  const topUpAmount = totalExpenses + 8000; // Оставляем 8000 на балансе

  await connection.execute(
    `INSERT INTO transactions (userId, type, amount, description, status, createdAt) 
     VALUES (?, 'deposit', ?, 'Пополнение баланса', 'completed', ?)`,
    [userId, topUpAmount, new Date('2024-12-01')]
  );
  console.log(`Создана транзакция пополнения: +${topUpAmount}₽`);

  // Создаем транзакции для каждого бронирования
  for (const booking of bookings) {
    const description = `Оплата бронирования #${booking.id}`;
    const createdAt = new Date(booking.startTime);
    createdAt.setHours(createdAt.getHours() - 1); // Транзакция за час до бронирования

    await connection.execute(
      `INSERT INTO transactions (userId, type, amount, description, status, createdAt) 
       VALUES (?, 'payment', ?, ?, 'completed', ?)`,
      [userId, -Math.abs(booking.totalPrice), description, createdAt]
    );
    console.log(`Создана транзакция для бронирования #${booking.id}: -${booking.totalPrice}₽`);
  }

  // Проверяем итоговый баланс
  const [balanceResult] = await connection.execute(
    'SELECT SUM(amount) as balance FROM transactions WHERE userId = ?',
    [userId]
  );
  
  console.log(`\nИтоговый баланс: ${balanceResult[0].balance}₽`);
  console.log('Синхронизация завершена успешно!');

} finally {
  await connection.end();
}
