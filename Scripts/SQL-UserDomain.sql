USE [ControlRemote]
GO

UPDATE [dbo].[ActionPoint]
   SET [UserDomain] = SUBSTRING([UserLogin],0,CHARINDEX('\',[UserLogin],0)),
   [UserLogin] = SUBSTRING([UserLogin],CHARINDEX('\',[UserLogin])+1,LEN([UserLogin]))

GO


