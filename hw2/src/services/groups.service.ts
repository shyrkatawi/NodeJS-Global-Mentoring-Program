import { Group, RequestGroupDto } from '../types/group';
import { NotFoundException } from '../exceptions/not-found.exception';
import { GroupModel } from '../data-access/models/group.model';
import { UserGroupModel } from '../data-access/models/user-group.model';

class GroupsService {
    async addGroup(group: Group): Promise<Group> {
        const dbResponse = await GroupModel.create({ ...group });
        return dbResponse['dataValues'];
    }

    async addUsersToGroup(groupId: string, userIds: string[]): Promise<string> {
        let group_users_array = [];
        for (const userId of userIds) {
            const user_group = {
                group_id: groupId,
                user_id: userId
            };
            group_users_array.push(user_group);
        }
        await UserGroupModel.sequelize.transaction(async () => {
            await UserGroupModel.bulkCreate(group_users_array);
        });
        return 'Users was added to group.';
    }

    async deleteGroupById(id: string): Promise<string> {
        const removedRows = await GroupModel.destroy({
            where: {
                id: id
            }
        });
        if (removedRows === 0) {
            throw new NotFoundException(id, 'group');
        }
        return `Group with id ${id} was deleted`;
    }

    async getGroupById(id: string): Promise<Group> {
        const group: GroupModel = await GroupModel.findOne(
            { where: { id: id } }
        );
        if (!group) {
            throw new NotFoundException(id, 'group');
        }
        return group['dataValues'];
    }

    async getGroups(): Promise<Group[]> {
        const dbResponse = await GroupModel.findAll();
        return dbResponse.map(e => e['dataValues']);
    }


    async updateGroup(id: string, requestGroupDto: RequestGroupDto): Promise<string> {
        const dbResponse = await GroupModel.update(
            { ...requestGroupDto },
            { where: { id: id } }
        );
        const numberOfUpdatedRows = dbResponse[0];
        if (numberOfUpdatedRows === 0) {
            throw new NotFoundException(id, 'group');
        }
        return `Group with id ${id} was updated`;
    }
}

export const groupsService = new GroupsService();