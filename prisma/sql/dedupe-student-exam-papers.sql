DELETE p1
FROM `studentExamPaper` p1
INNER JOIN `studentExamPaper` p2
  ON p1.studentExamId = p2.studentExamId
 AND p1.paperId = p2.paperId
 AND p1.studentExamPaperId > p2.studentExamPaperId;
