DROP TABLE IF EXISTS stadiums;

CREATE TABLE stadiums (
    s_id INTEGER PRIMARY KEY,
    s_name TEXT,
    s_capacity INTEGER,
    s_city TEXT,
    s_state TEXT,
    s_grass TEXT,
    s_roof TEXT,
    s_year INTEGER
);


INSERT INTO stadiums
(s_id,s_name,s_capacity,s_city,s_state,s_grass,s_roof,s_year)
VALUES 
( 5001,"Acrisure Stadium",68400,"Pittsburgh","Pennsylvania","Kentucky bluegrass","Open",2001),
( 5002,"Allegiant Stadium",65000,"Paradise","Nevada","Bermuda grass","Fixed",2020),
( 5003,"Arrowhead Stadium",76416,"Kansas City","Missouri","Bermuda grass","Open",1972),
( 5004,"AT&T Stadium",80000,"Arlington","Texas","Hellas Matrix Turf","Retractable",2009),
( 5005,"Bank of America Stadium",75523,"Charlotte","North Carolina","FieldTurf","Open",1996),
( 5006,"Caesars Superdome",73208,"New Orleans","Louisiana","FieldTurf Revolution 360","Fixed",1975),
( 5007,"Cleveland Browns Stadium",67895,"Cleveland","Ohio","Kentucky bluegrass","Open",1999),
( 5008,"Empower Field at Mile High",76125,"Denver","Colorado","Kentucky bluegrass","Open",2001),
( 5009,"FedEx Field",67717,"Landover","Maryland","Bermuda grass","Open",1997),
( 5010,"Ford Field",65000,"Detroit","Michigan","FieldTurf Classic HD","Fixed",2002),
( 5011,"Gillette Stadium",66829,"Foxborough","Massachusetts","FieldTurf CORE","Open",2002),
( 5012,"Hard Rock Stadium",65326,"Miami Gardens","Florida","Bermuda grass","Open",1987),
( 5013,"Highmark Stadium",71608,"Orchard Park","New York","A-Turf Titan 50","Open",1973),
( 5014,"Lambeau Field",81441,"Green Bay","Wisconsin","Kentucky bluegrass reinforced with SIS Grass","Open",1957),
( 5015,"Levi's Stadium",68500,"Santa Clara","California","Bermuda grass / Perennial Ryegrass mixture","Open",2014),
( 5016,"Lincoln Financial Field",69596,"Philadelphia","Pennsylvania","Desso GrassMaster","Open",2003),
( 5017,"Lucas Oil Stadium",67000,"Indianapolis","Indiana","Shaw Sports Momentum Pro","Retractable",2008),
( 5018,"Lumen Field",69000,"Seattle","Washington","FieldTurf Revolution 360","Open",2002),
( 5019,"M&T Bank Stadium",71008,"Baltimore","Maryland","Bermuda grass","Open",1998),
( 5020,"Mercedes-Benz Stadium",71000,"Atlanta","Georgia","FieldTurf Revolution","Retractable",2017),
( 5021,"MetLife Stadium",82500,"East Rutherford","New Jersey","UBU Speed Series S5-M Synthetic Turf","Open",2010),
( 5022,"Nissan Stadium",69143,"Nashville","Tennessee","Bermuda grass","Open",1999),
( 5023,"NRG Stadium",72220,"Houston","Texas","Hellas Matrix Turf","Retractable",2002),
( 5024,"Paycor Stadium",65515,"Cincinnati","Ohio","UBU Speed Series S5-M Synthetic Turf","Open",2000),
( 5025,"Raymond James Stadium",69218,"Tampa","Florida","Bermuda grass","Open",1998),
( 5026,"SoFi Stadium",70000,"Inglewood","California","Hellas Matrix Turf","Fixed",2020),
( 5027,"Soldier Field",61500,"Chicago","Illinois","Bermuda grass","Open",1924),
( 5028,"State Farm Stadium",63400,"Glendale","Arizona","Bermuda grass","Retractable",2006),
( 5029,"TIAA Bank Field",67838,"Jacksonville","Florida","Bermuda grass","Open",1995),
( 5030,"U.S. Bank Stadium",66655,"Minneapolis","Minnesota","UBU Speed Series S5-M Synthetic Turf","Fixed",2016);
P