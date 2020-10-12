export const checkAdmin = () => {
    if(window.sessionStorage.getItem('admin') != 'Y'){
        alert("비밀번호를 입력해주세요.");
        window.location.replace("/manage/login");
    }
}