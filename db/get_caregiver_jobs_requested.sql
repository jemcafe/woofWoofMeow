SELECT * FROM jobs j
JOIN users u ON j.petowner_id = u.user_id
WHERE j.request_status = 'f' AND j.caregiver_id = $1;