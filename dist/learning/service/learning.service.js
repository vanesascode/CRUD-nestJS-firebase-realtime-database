"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LearningService = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("firebase/database");
const firebase_config_1 = require("../../firebase.config");
let LearningService = class LearningService {
    async createData(createLearningDto) {
        const dataRef = (0, database_1.ref)(firebase_config_1.firebaseDatabase, 'Data');
        const newElementRef = (0, database_1.push)(dataRef, { dataRef: createLearningDto });
        await (0, database_1.set)(newElementRef, createLearningDto);
        const snapshot = await (0, database_1.get)(newElementRef);
        const createdData = snapshot.val();
        console.log('Data created successfully', createdData);
        return createdData;
    }
    async getData() {
        const dataRef = (0, database_1.ref)(firebase_config_1.firebaseDatabase, 'Data');
        const snapshot = await (0, database_1.get)(dataRef);
        console.log('Data retrieved successfully');
        return snapshot.val();
    }
    async getDataById(id) {
        const dataRef = (0, database_1.ref)(firebase_config_1.firebaseDatabase, 'Data');
        const snapshot = await (0, database_1.get)(dataRef);
        let retrievedData = null;
        snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            if (childKey === id) {
                console.log('Data retrieved successfully', childSnapshot.val());
                retrievedData = childSnapshot.val();
            }
        });
        return retrievedData;
    }
    async deleteData(id) {
        const dataRef = (0, database_1.ref)(firebase_config_1.firebaseDatabase, 'Data');
        const snapshot = await (0, database_1.get)(dataRef);
        let deletedData = null;
        snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            if (childKey === id) {
                const dataToDeleteRef = (0, database_1.ref)(firebase_config_1.firebaseDatabase, 'Data/' + childKey);
                (0, database_1.remove)(dataToDeleteRef);
                console.log('Data deleted successfully');
                deletedData = childSnapshot.val();
            }
        });
        return deletedData;
    }
};
exports.LearningService = LearningService;
exports.LearningService = LearningService = __decorate([
    (0, common_1.Injectable)()
], LearningService);
//# sourceMappingURL=learning.service.js.map