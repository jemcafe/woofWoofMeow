INSERT INTO animals
(animal_name, breed, age, weight, sex, animal_avatar, user_id)
VALUES
($1, $2, $3, $4, $5, $6, $7)
RETURNING *;