//リソース名を定数で管理(フォルダ名と一致させる)
const resourceName = 'null-template-nui';

// Luaからのメッセージ受信
// LuaのSendNUIMessageで送られたデータはここで受け取る
window.addEventListener('message', function(event){
    const item = event.data;

    //actionプロパティを処理で分岐
    if (item.action === 'open'){
        // UIを表示
        const container = this.document.getElementById('container');
        container.style.display = 'block';

        // テキストを更新(luaからのtextデータ)
        if(item.text){
            this.document.getElementById('message-area').innerText = item.text;
        }
    }
    else if (item.action === 'close'){
        //UIを非表示
        this.document.getElementById('container').style.display = 'none';
    }
});

//閉じるボタンの動作
//ユーザがボタンを押したときにLua側に通知する
document.getElementById('close-btn').addEventListener('click', function(){
    //まずJS側でUIを非表示にする
    document.getElementById('container').style.display = 'none';

    //NUI Callback
    //URL形式 https://[リソース名]/[コールバック名]
    fetch(`https://${resourceName}/closeUI`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            // 必要ならここにデータを入れてLuaに送る
            // 例: inputValue: document.getElementById('input').value
        })
    }).then(resp => resp.json()).catch(err => console.error('NUI ERROR:', err));
});