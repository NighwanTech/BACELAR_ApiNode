"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResponse = createResponse;
function createResponse(message, data) {
    return {
        success: true,
        message,
        data,
    };
}
//# sourceMappingURL=response.js.map