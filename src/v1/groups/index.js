import {BaseGroup} from './Base';

let group = new BaseGroup();
group.name = 'Admin';
group.setRules({
    'deleteAll' : true,
    'createAll' : true,
    'updateAll' : true,
    'readAll'   : true
});
group.save();