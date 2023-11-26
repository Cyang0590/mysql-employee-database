SELECT departments.department_name AS department
FROM
LEFT JOIN department
ON reviews.department_id = departments.id
ORDER BY departments.department_name