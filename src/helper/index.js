const myPlugin = {
    install(app) {
        app.config.globalProperties.$numFormat = (key) => {
            return Number(key).toLocaleString();
        },
        app.config.globalProperties.$numFormatWithRp = (key) => {
            return key ? 'Rp.' + Number(key).toLocaleString() : '-';
        }
        app.config.globalProperties.$sumDataPallet = (key) => {
            return key.reduce((acc, item) => acc + item.quantity, 0);

        }
    }
}
export default myPlugin;