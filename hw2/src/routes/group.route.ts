import express from 'express';
import { validateBodySchema, validateIdInParams } from '../middlewares/validation.middleware';
import { addUsersToGroupScheme, requestGroupScheme } from '../schemes/group.scheme';
import { Group, RequestGroupDto } from '../types/group';
import { Permission } from '../types/permission';
import { groupsService } from '../services/groups.service';

const groupsRouter = express.Router();

// get all groups
groupsRouter.get('/',
    async (req, res) => {
        const allGroupsFromDB: Group[] = await groupsService.getGroups();
        res.send(allGroupsFromDB);
    }
);

// get group by uuid
groupsRouter.get('/id/:id',
    validateIdInParams(),
    async (req, res, next) => {
        try {
            const id: string = req.params.id;
            const group: Group = await groupsService.getGroupById(id);
            res.send(group);
        } catch (error) {
            next(error);
        }
    }
);

// add group
groupsRouter.post('/',
    validateBodySchema(requestGroupScheme),
    async (req, res, next) => {
        try {
            const requestGroupDto: RequestGroupDto = req.body;
            const { name, permissions }: { name: string, permissions: Array<Permission> } = requestGroupDto;
            const group: Group = new Group(name, permissions);
            const createdGroup: Group = await groupsService.addGroup(group);
            res.send(createdGroup);
        } catch (error) {
            next(error);
        }
    }
);

// add users to group
groupsRouter.post('/addUsersToGroup/',
    validateBodySchema(addUsersToGroupScheme),
    async (req, res, next) => {
        try {
            const { groupId, userIds } = req.body;
            const message: string = await groupsService.addUsersToGroup(groupId, userIds);
            res.send(message);
        } catch (error) {
            next(error);
        }
    }
);

// update group
groupsRouter.put('/id/:id',
    validateIdInParams(),
    validateBodySchema(requestGroupScheme),
    async (req, res, next) => {
        try {
            const id: string = req.params.id;
            const RequestGroupDto: RequestGroupDto = req.body;
            const message: string = await groupsService.updateGroup(id, RequestGroupDto);
            res.send(message);
        } catch (error) {
            next(error);
        }
    }
);

// delete group by uuid
groupsRouter.delete('/id/:id',
    validateIdInParams(),
    async (req, res, next) => {
        try {
            const id: string = req.params.id;
            const message: string = await groupsService.deleteGroupById(id);
            res.send(message);
        } catch (error) {
            next(error);
        }
    }
);

export { groupsRouter };