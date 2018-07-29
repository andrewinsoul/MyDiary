export default {
  CreateUserTable: 'CREATE TABLE IF NOT EXISTS users(userId SERIAL PRIMARY KEY, Name VARCHAR(350), Username VARCHAR(350) unique, Password VARCHAR(350) not null, Email VARCHAR(350) unique)',

  CreateDiaryTable: 'CREATE TABLE IF NOT EXISTS diaries(diaryId SERIAL PRIMARY KEY, Name VARCHAR(350) not null, Description VARCHAR(350) not null, diaryType VARCHAR(50), userId INT, FOREIGN KEY (userId) REFERENCES users (userId))',

  CreateEntryTable: 'CREATE TABLE IF NOT EXISTS entries(entryId SERIAL PRIMARY KEY, Title VARCHAR(350), Entry TEXT, CreatedAt TIMESTAMPTZ DEFAULT NOW(), diaryId INT, FOREIGN KEY (diaryId) REFERENCES diaries (diaryId))',
};
