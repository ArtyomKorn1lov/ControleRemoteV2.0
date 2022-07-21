USE ControlRemote
GO

IF OBJECT_ID(N'[dbo].[Manager]', N'U') IS NULL
	BEGIN
	CREATE TABLE [dbo].[Manager] (
		[Id] [int] IDENTITY(1, 1) NOT NULL CONSTRAINT PK_Manager PRIMARY KEY,
		[Name] [nvarchar] (50) NOT NULL,
		[Login] [nvarchar] (50) NOT NULL,
		[Password] [nvarchar] (256) NOT NULL,
	)
	END
ELSE
	PRINT 'Таблица Manager уже существует'
GO

IF OBJECT_ID(N'[dbo].[Employer]', N'U') IS NULL
	BEGIN
	CREATE TABLE [dbo].[Employer] (
		[Id] [int] IDENTITY(1, 1) NOT NULL CONSTRAINT PK_Employer PRIMARY KEY,
		[ManagerId] [int] NOT NULL,
		[Name] [nvarchar] (50) NOT NULL,
		[Login] [nvarchar] (50) NOT NULL,
		FOREIGN	KEY (ManagerId) REFERENCES [dbo].[Manager] (Id) 
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	)
	END
ELSE
	PRINT 'Таблица Employer уже существует'
GO