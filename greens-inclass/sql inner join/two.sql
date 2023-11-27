DROP TABLE IF EXISTS teams;

CREATE TABLE teams (
    t_id TEXT PRIMARY KEY,
    t_name TEXT,
    t_conference TEXT,
    t_division TEXT,
    t_founded INTEGER,
    t_stadium INTEGER
);

INSERT INTO teams
(t_id, t_name, t_conference, t_division, t_founded, t_stadium)
VALUES 
( "ARI", "Arizona Cardinals", "NFC", "West", 1920, 5028),
( "ATL", "Atlanta Falcons", "NFC", "South", 1966, 5020),
( "BAL", "Baltimore Ravens", "AFC", "North", 1996, 5019),
( "BUF", "Buffalo Bills", "AFC", "East", 1960, 5013),
( "CAR", "Carolina Panthers", "NFC", "South", 1995, 5005),
( "CHI", "Chicago Bears", "NFC", "North", 1920, 5027),
( "CIN", "Cincinnati Bengals", "AFC",  "North", 1968, 5024),
( "CLE", "Cleveland Browns", "AFC", "North", 1950, 5007),
( "DAL", "Dallas Cowboys", "NFC", "East", 1960, 5004),
( "DEN", "Denver Broncos", "AFC", "West", 1960, 5008),
( "DET", "Detroit Lions", "NFC", "North", 1930, 5010),
( "GB", "Green Bay Packers", "NFC", "North", 1921, 5014),
( "HOU", "Houston Texans", "AFC", "South", 2002, 5023),
( "IND", "Indianapolis Colts", "AFC", "South", 1953, 5017),
( "JAC", "Jacksonville Jaguars", "AFC", "South", 1995, 5029),
( "KC", "Kansas City Chiefs", "AFC", "West", 1960, 5003),
( "LV", "Las Vegas Raiders", "AFC", "West", 1960, 5002),
( "LAC", "Los Angeles Chargers", "AFC", "West", 1960, 5026),
( "LAR", "Los Angeles Rams", "NFC", "West", 1937, 5026),
( "MIA", "Miami Dolphins", "AFC", "East", 1966, 5012),
( "MIN", "Minnesota Vikings", "NFC", "North", 1961, 5030),
( "NE", "New England Patriots", "AFC", "East", 1960, 5011),
( "NO", "New Orleans Saints", "NFC", "South", 1967, 5006),
( "NYG", "New York Giants", "NFC", "East", 1925, 5021),
( "NYJ", "New York Jets", "AFC", "East", 1960, 5021),
( "PHI", "Philadelphia Eagles", "NFC", "East", 1933, 5016),
( "PIT", "Pittsburgh Steelers", "AFC", "North", 1933, 5001),
( "SF", "San Francisco 49ers", "NFC", "West", 1950, 5015),
( "SEA", "Seattle Seahawks", "NFC", "West", 1976, 5018),
( "TB", "Tampa Bay Buccaneers", "NFC", "South", 1976, 5025),
( "TEN", "Tennessee Titans", "AFC", "South", 1960, 5022),
( "WAS", "Washington Commanders", "NFC", "East", 1932, 5009);