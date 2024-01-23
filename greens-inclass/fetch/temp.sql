DROP TABLE IF EXISTS votes;

CREATE TABLE votes (
    upvotes INTEGER,
    downvotes INTEGER
);

INSERT INTO votes (upvotes, downvotes)
VALUES (0, 0)