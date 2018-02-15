UPDATE caregiver_booked_for
SET month = $1, day = $2, year = $3, begin_time = $4, end_time = $5, am_pm = $6
WHERE user_id = $7 AND days_booked_id = $8
RETURNING *;