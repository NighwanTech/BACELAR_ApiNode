UPDATE students s
INNER JOIN admissionSessions a ON a.admissionSessionId = s.admissionSessionId
INNER JOIN academicSessionMaster ac
  ON UPPER(TRIM(ac.academicSessionName)) = UPPER(TRIM(a.admissionSessionName))
  AND ac.IsDeleted = 0
SET s.academicSessionId = ac.academicSessionId
WHERE s.academicSessionId IS NULL
  AND s.admissionSessionId IS NOT NULL;
