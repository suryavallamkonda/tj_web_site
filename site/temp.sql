-- CREATE TABLE equipment (
--     id INTEGER PRIMARY KEY,
--     item TEXT NOT NULL,
--     lore TEXT NOT NUll,
--     hero TEXT,
--     wit INTEGER NOT NULL,
--     strength INTEGER NOT NULL,
--     attack INTEGER NOT NULL,
--     defense INTEGER NOT NULL,
--     magic INTEGER NOT NULL
-- )

-- INSERT INTO equipment (id, item, lore, hero, wit, strength, attack, defense, magic)
-- VALUES (10000, "debug", "for debug purposes", "UNEQUIPPED", 999, 999, 999, 999, 999)

-- CREATE TABLE quests (
--     id INTEGER PRIMARY KEY,
--     name TEXT NOT NULL,
--     description TEXT NOT NULL,
--     hero TEXT,
--     wit_req INTEGER NOT NULL,
--     strength_req INTEGER NOT NULL,
--     attack_req INTEGER NOT NULL,
--     defense_req INTEGER NOT NULL,
--     magic_req INTEGER NOT NUll
-- )

-- INSERT INTO quests (id, name, description, hero, wit_req, strength_req, attack_req, defense_req, magic_req)
-- VALUES (9000, "debug", "for debug purposes", "UNCLAIMED", 999, 999, 999, 999, 999)


CREATE TABLE assigned_equipment (
    hero_id INTEGER,
    equipment_id INTEGER
)

CREATE TABLE assigned_quests (
    hero_id INTEGER,
    quest_id INTEGER
)


