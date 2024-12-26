"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_model_1 = require("./user.model");
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = Object.assign({}, payload);
    const { name, email, role } = yield user_model_1.User.create(userData);
    return { name, email, role };
});
const getAllUserFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find(Object.assign({}, query)).select("name email role");
    return result;
});
const getMeFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(id).select("name email role profileImage phoneNumber");
    return result;
});
const updateUserInDB = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOneAndUpdate({ _id: user === null || user === void 0 ? void 0 : user._id }, Object.assign({}, payload), { new: true }).select("name email role");
    return result;
});
const deleteUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
});
exports.UserServices = {
    createUserIntoDB,
    getAllUserFromDB,
    getMeFromDB,
    updateUserInDB,
    deleteUserFromDB
};
