class AccessUser {
    static checkAdminGroup(groups) {
        let bIsAdmin = false;
        groups.filter(function(item) { 
            if(item === 'admin') {
                bIsAdmin = true;
            }
        });
        return bIsAdmin;
    }
}

class AccessGroup {
    
}

module.exports = AccessUser;