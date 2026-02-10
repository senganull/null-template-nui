RegisterCommand('nui', function()
    -- NUIフォーカスを有効
    -- 第一引数 (hasFocus) キーボード入力をUIに渡すか
    -- 第二引数 (hasCursor) マウスカーソルを表示するか
    SetNuiFocus(true, true)

    -- JSにメッセージを送信(UI表示)
    -- action 'open'でJS分岐トリガー
    -- text 表示したい文章
    SendNUIMessage({
        action = 'open',
        text = 'Luaから送信されたメッセージです。<br>このウィンドウはJSで制御されています。'
    })
    
    print("DEBUG: NUI OPENED")
end,false)


-- JSからのコールバック受信
-- JS側の fetch(`https://${resourceName}/closeUI`)に対応
RegisterNUICallback('closeUI', function(data, cb)
    -- NUIフォーカスを無効
    SetNuiFocus(false, false)

    print("DEBUG: NUI Closed by User")

    -- JS側に処理完了を伝える(必須)
    -- これを返さないとJS側でエラーやタイムアウトになることがある
    cb({ status = 'ok' })
end)