#!/usr/bin/env python3
from pathlib import Path
import re

ROOT = Path("/Users/rishichandra/Desktop/nighwan/bacelar/BACELAR_ApiNode")
HTTP = ROOT / "apps/backend/src/master"
TCP = ROOT / "apps/student-service/src/master"
SVC = TCP

HELPER_HTTP = "import { parseActiveOnlyFlag } from '../../common/parse-active-only';\n"
HELPER_TCP = "import { isActiveOnly } from '../../common/active-only';\n"

SIMPLE_HTTP = [
    "board/board.controller.ts",
    "college/college.controller.ts",
    "program-category/program-category.controller.ts",
    "admission-session/admission-session.controller.ts",
    "qualification/qualification.controller.ts",
    "state/state.controller.ts",
    "fee-type/fee-type.controller.ts",
    "exam-type/exam-type.controller.ts",
    "paper-type/paper-type.controller.ts",
    "marks-type/marks-type.controller.ts",
    "year/year.controller.ts",
    "semester/semester.controller.ts",
    "role/role.controller.ts",
    "paper-detail/paper-detail.controller.ts",
    "exam-subject/exam-subject.controller.ts",
]


def ensure_import(text: str, line: str) -> str:
    if line.strip() in text:
        return text
    # insert after last import
    matches = list(re.finditer(r"^import .*;\n", text, re.M))
    if not matches:
        return line + text
    last = matches[-1].end()
    return text[:last] + line + text[last:]


def patch_simple_http(path: Path):
    text = path.read_text()
    text = ensure_import(text, HELPER_HTTP)
    text = re.sub(
        r"  findAll\(\): Observable<any> \{\n    return this\.studentClient\.send\(\{ cmd: '([^']+)' \}, \{\}\);\n  \}",
        r"  findAll(@Query('activeOnly') activeOnly?: string): Observable<any> {\n    return this.studentClient.send({ cmd: '\1' }, { activeOnly: parseActiveOnlyFlag(activeOnly) });\n  }",
        text,
        count=1,
    )
    if "@ApiQuery({ name: 'activeOnly'" not in text:
        text = text.replace(
            "  findAll(@Query('activeOnly') activeOnly?: string): Observable<any> {",
            "  @ApiQuery({ name: 'activeOnly', required: false, example: true, description: 'If true, return only IsActive records (dropdowns)' })\n  findAll(@Query('activeOnly') activeOnly?: string): Observable<any> {",
            1,
        )
    path.write_text(text)
    print("http", path)


def patch_tcp_no_payload(path: Path, service_call: str):
    text = path.read_text()
    if "Payload" not in text.split("from '@nestjs/microservices'")[0]:
        text = text.replace(
            "import { MessagePattern, Payload } from '@nestjs/microservices';",
            "import { MessagePattern, Payload } from '@nestjs/microservices';",
        )
    # already has Payload in most files
    text = re.sub(
        r"  async findAll\(\) \{\n    try \{\n      return await this\." + re.escape(service_call) + r"\.findAll\(\);",
        "  async findAll(@Payload() data?: { activeOnly?: boolean }) {\n    try {\n      return await this."
        + service_call
        + ".findAll(data?.activeOnly);",
        text,
        count=1,
    )
    path.write_text(text)
    print("tcp", path)


def patch_service_simple(path: Path):
    text = path.read_text()
    text = ensure_import(text, HELPER_TCP)
    text = re.sub(
        r"  async findAll\(\) \{\n    return this\.(prisma\.\w+|collegeMaster)\.findMany\(\{\n      where: \{ IsDeleted: false \},",
        r"  async findAll(activeOnly = false) {\n    return this.\1.findMany({\n      where: { IsDeleted: false, ...(isActiveOnly(activeOnly) ? { IsActive: true } : {}) },",
        text,
        count=1,
    )
    path.write_text(text)
    print("svc", path)


TCP_MAP = {
    "board/board.controller.ts": "boardService",
    "college/college.controller.ts": "collegeService",
    "program-category/program-category.controller.ts": "programCategoryService",
    "admission-session/admission-session.controller.ts": "sessionService",
    "qualification/qualification.controller.ts": "qualificationService",
    "state/state.controller.ts": "stateService",
    "fee-type/fee-type.controller.ts": "feeTypeService",
    "exam-type/exam-type.controller.ts": "examTypeService",
    "paper-type/paper-type.controller.ts": "paperTypeService",
    "marks-type/marks-type.controller.ts": "marksTypeService",
    "year/year.controller.ts": "yearService",
    "semester/semester.controller.ts": "semesterService",
    "role/role.controller.ts": "roleService",
    "paper-detail/paper-detail.controller.ts": "paperDetailService",
    "exam-subject/exam-subject.controller.ts": "examSubjectService",
}

SVC_FILES = [
    "board/board.service.ts",
    "college/college.service.ts",
    "program-category/program-category.service.ts",
    "admission-session/admission-session.service.ts",
    "qualification/qualification.service.ts",
    "state/state.service.ts",
    "fee-type/fee-type.service.ts",
    "exam-type/exam-type.service.ts",
    "paper-type/paper-type.service.ts",
    "marks-type/marks-type.service.ts",
    "year/year.service.ts",
    "semester/semester.service.ts",
    "role/role.service.ts",
    "paper-detail/paper-detail.service.ts",
    "exam-subject/exam-subject.service.ts",
]

for rel in SIMPLE_HTTP:
    patch_simple_http(HTTP / rel)

for rel, svc in TCP_MAP.items():
    patch_tcp_no_payload(TCP / rel, svc)

for rel in SVC_FILES:
    patch_service_simple(SVC / rel)

print("done simple")
