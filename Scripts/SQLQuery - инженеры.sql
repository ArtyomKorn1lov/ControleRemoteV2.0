/****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
SELECT Station + ' -> ' + UserLogin СтанцияЛогин, DAY(DateTimeAction) Дата, DATEPART(hour,DateTimeAction) Час, 
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 0, 1,0)) = 1, 'X', ' ') М1,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 1, 1,0)) = 1, 'X', ' ') М2,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 2, 1,0)) = 1, 'X', ' ') М3,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 3, 1,0)) = 1, 'X', ' ') М4,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 4, 1,0)) = 1, 'X', ' ') М5,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 5, 1,0)) = 1, 'X', ' ') М6,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 6, 1,0)) = 1, 'X', ' ') М7,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 7, 1,0)) = 1, 'X', ' ') М8,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 8, 1,0)) = 1, 'X', ' ') М9,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 9, 1,0)) = 1, 'X', ' ') М10,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 10, 1,0)) = 1, 'X', ' ') М11,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 11, 1,0)) = 1, 'X', ' ') М12,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 12, 1,0)) = 1, 'X', ' ') М13,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 13, 1,0)) = 1, 'X', ' ') М14,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 14, 1,0)) = 1, 'X', ' ') М15,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 15, 1,0)) = 1, 'X', ' ') М16,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 16, 1,0)) = 1, 'X', ' ') М17,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 17, 1,0)) = 1, 'X', ' ') М18,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 18, 1,0)) = 1, 'X', ' ') М19,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 19, 1,0)) = 1, 'X', ' ') М20,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 20, 1,0)) = 1, 'X', ' ') М21,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 21, 1,0)) = 1, 'X', ' ') М22,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 22, 1,0)) = 1, 'X', ' ') М23,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 23, 1,0)) = 1, 'X', ' ') М24,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 24, 1,0)) = 1, 'X', ' ') М25,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 25, 1,0)) = 1, 'X', ' ') М26,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 26, 1,0)) = 1, 'X', ' ') М27,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 27, 1,0)) = 1, 'X', ' ') М28,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 28, 1,0)) = 1, 'X', ' ') М29,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 29, 1,0)) = 1, 'X', ' ') М30,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 30, 1,0)) = 1, 'X', ' ') М31,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 31, 1,0)) = 1, 'X', ' ') М32,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 32, 1,0)) = 1, 'X', ' ') М33,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 33, 1,0)) = 1, 'X', ' ') М34,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 34, 1,0)) = 1, 'X', ' ') М35,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 35, 1,0)) = 1, 'X', ' ') М36,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 36, 1,0)) = 1, 'X', ' ') М37,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 37, 1,0)) = 1, 'X', ' ') М38,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 38, 1,0)) = 1, 'X', ' ') М39,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 39, 1,0)) = 1, 'X', ' ') М40,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 40, 1,0)) = 1, 'X', ' ') М41,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 41, 1,0)) = 1, 'X', ' ') М42,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 42, 1,0)) = 1, 'X', ' ') М43,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 43, 1,0)) = 1, 'X', ' ') М44,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 44, 1,0)) = 1, 'X', ' ') М45,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 45, 1,0)) = 1, 'X', ' ') М46,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 46, 1,0)) = 1, 'X', ' ') М47,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 47, 1,0)) = 1, 'X', ' ') М48,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 48, 1,0)) = 1, 'X', ' ') М49,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 49, 1,0)) = 1, 'X', ' ') М50,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 50, 1,0)) = 1, 'X', ' ') М51,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 51, 1,0)) = 1, 'X', ' ') М52,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 52, 1,0)) = 1, 'X', ' ') М53,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 53, 1,0)) = 1, 'X', ' ') М54,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 54, 1,0)) = 1, 'X', ' ') М55,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 55, 1,0)) = 1, 'X', ' ') М56,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 56, 1,0)) = 1, 'X', ' ') М57,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 57, 1,0)) = 1, 'X', ' ') М59,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 58, 1,0)) = 1, 'X', ' ') М59,
  IIF(SUM(IIF(DATEPART(MI, DateTimeAction) = 59, 1,0)) = 1, 'X', ' ') М60
  FROM [ControlRemote].[dbo].[ActionPoint]
  WHERE DateTimeAction >= '20210101' AND DateTimeAction < '20220629' AND
    (UserLogin LIKE 'RICTELECOM\pavel' OR
	UserLogin LIKE 'RICTELECOM\mpush' OR
	UserLogin LIKE 'RICTELECOM\MuhinaM' OR
	UserLogin LIKE 'RICTELECOM\djouker' OR
	UserLogin LIKE 'RICTELECOM\ChizhikovaY' OR
	UserLogin LIKE 'RICTELECOM\adamyan_o' OR
	UserLogin LIKE 'RICTELECOM\andreeva_e' OR
	UserLogin LIKE 'RICTELECOM\sk' OR
	UserLogin LIKE 'RICTELECOM\samoylova_i' OR
	UserLogin LIKE 'RICTELECOM\derbeneva_n' OR
	UserLogin LIKE 'RICTELECOM\kirchanov_k' OR
	UserLogin LIKE 'RICTELECOM\tanyabez' OR
	UserLogin LIKE 'RICTELECOM\oleg' OR
	UserLogin LIKE 'RICTELECOM\olesia' OR
	UserLogin LIKE 'RICTELECOM\pushkin_a' OR
	UserLogin LIKE 'RICTELECOM\Tybarovskaya_L' OR
	UserLogin LIKE 'RICTELECOM\Vovan' OR
	UserLogin LIKE 'RICTELECOM\baranova_s' OR
	UserLogin LIKE 'RICTELECOM\mayorov_a' OR
	UserLogin LIKE 'RICTELECOM\titar_a')
  GROUP BY Station, UserLogin, DAY(DateTimeAction),  DATEPART(HOUR,DateTimeAction)
  ORDER BY СтанцияЛогин, Дата, Час
 