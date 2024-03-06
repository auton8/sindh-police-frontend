import { Constants } from '@services';
export const socketConfig = (authUser) => {
    let socket = null;
    // var iTem = localStorage.getItem('cypress_user_1001');
    // var bytes = iTem ? CryptoJS.AES.decrypt(iTem, MKV).toString(CryptoJS.enc.Utf8) : null;
    // var authUser = bytes ? JSON.parse(bytes) : null;
    if (authUser) {
        socket = new WebSocket(`${Constants.SOCKET_URL}?token=${authUser.accessToken}`)
    }
    return (dispatch) => {
        dispatch({
            type: 'socket-initial',
            payload: socket,
        });
    };
}