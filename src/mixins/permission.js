export default {
    methods: {
        $can(permissionName) {
            let Permission = JSON.parse(localStorage.getItem("permission"))
            if (typeof Permission != 'undefined') {
                return Permission.indexOf(permissionName) !== -1;
            }
        },
    },
};