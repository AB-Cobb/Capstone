INSERT INTO team_member (name, email, phone, gender, weight, height, side_preference, active, emergency_cont)
	VALUES 
		("Tim","Name@Domain.com","555-123-4567","Male","68","170","R","1","555-123-4567"),
		("Bob","Name@Domain.com","555-123-4567","Male","68","170","R","1","555-123-4567"),
		("Joe","Name@Domain.com","555-123-4567","Male","68","170","L","1","555-123-4567"),
		("Sam","Name@Domain.com","555-123-4567","Male","68","170","A","1","555-123-4567"),
		("Fred","Name@Domain.com","555-123-4567","Male","68","170","R","1","555-123-4567"),
		("Sally","Name@Domain.com","555-123-4567","Female","68","170","R","1","555-123-4567"),
		("Victor","Name@Domain.com","555-123-4567","Male","68","170","L","1","555-123-4567"),
		("Peter","Name@Domain.com","555-123-4567","Male","68","170","A","1","555-123-4567"),
		("Mary","Name@Domain.com","555-123-4567","Female","68","170","L","1","555-123-4567"),
		("Suesan","Name@Domain.com","555-123-4567","Female","68","170","L","1","555-123-4567"),
		("Ashley","Name@Domain.com","555-123-4567","Female","68","170","R","1","555-123-4567"),
		("Morgan","Name@Domain.com","555-123-4567","Male","68","170","R","1","555-123-4567"),
		("Jill","Name@Domain.com","555-123-4567","Female","68","170","A","1","555-123-4567"),
		("Harry","Name@Domain.com","555-123-4567","Male","68","170","A","1","555-123-4567"),
		("Kim","Name@Domain.com","555-123-4567","Female","68","170","R","1","555-123-4567"),
		("Laura","Name@Domain.com","555-123-4567","Female","68","170","R","1","555-123-4567"),
		("Molly","Name@Domain.com","555-123-4567","Female","68","170","L","1","555-123-4567"),
		("Mike","Name@Domain.com","555-123-4567","Male","68","170","A","1","555-123-4567"),
        ("Gordan","Name@Domain.com","555-123-4567","Male","68","170","R","1","555-123-4567"),
		("Tom","Name@Domain.com","555-123-4567","Male","68","170","R","1","555-123-4567"),
		("Fiona","Name@Domain.com","555-123-4567","Male","68","170","R","1","555-123-4567"),
		("Dorothy","Name@Domain.com","555-123-4567","Female","68","170","R","1","555-123-4567"),
		("Samatha","Name@Domain.com","555-123-4567","Female","68","170","R","1","555-123-4567");

INSERT INTO boat_layout (num_paddlers, active, name, date)
     VALUES (18,1,"Dragon McBoatFace","2020/03/14");

INSERT INTO paddler_on_boat (layout_id, team_member_id, position, side)
	VALUES 
		(1,1,0,0),
		(1,2,0,1),
		(1,3,1,0),
		(1,4,1,1),
		(1,5,2,0),
		(1,6,2,1),
		(1,7,3,0),
		(1,8,3,1),
		(1,9,4,0),
		(1,10,4,1),
		(1,11,5,0),
		(1,12,5,1),
		(1,13,6,0),
		(1,14,6,1),
		(1,15,7,0),
		(1,16,7,1),
		(1,17,8,0),
		(1,18,8,1);

INSERT INTO race (layout_id, race_date, duration, distance)
	VALUES (1,"2020/03/14","1200","800");	

INSERT INTO map_point (race_id, long, lat, timestamp)
 values (1,43.628,-79.459, 1584235300),
  (1,43.629,-79.459, 1584235400),
  (1,43.630,-79.459, 1584235500),
  (1,43.630,-79.460, 1584235600),
  (1,43.630,-79.461, 1584235700),
  (1,43.631,-79.462, 1584235800);
				