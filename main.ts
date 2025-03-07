// 處理"關機"相關圖像及參數設定
function DoOFF () {
    // 舵機讓發射軌道歸零
    Angle = 10
    // 馬達速度歸零
    MoterSpeed = 0
    // 設定速度角度參數到設備中
    SetDevice()
    // 顯示關機圖樣
    basic.showIcon(IconNames.SmallDiamond)
}
// 處理"最佳發射參數"相關圖像顯示以及發射參數設定
function DoPreset () {
    // 如果要設定成F16的最佳發射參數
    // 如果要設定成F35的最佳發射參數
    // 如果要設定成幻象2000的最佳發射參數
    if (Preset == 0) {
        // 顯示F16圖示
        basic.showLeds(`
            # # . # .
            # . . . .
            # # . # #
            # . . # #
            # . . # #
            `)
        // F16最佳發射角度為軌道10度，舵機40度。
        // 最佳發射速度為80%，馬達速度204
        Angle = 40
        MoterSpeed = 204
    } else if (Preset == 1) {
        // 顯示F16圖示
        basic.showLeds(`
            # # . # #
            # . . # .
            # # . . .
            # . . # #
            # . # # #
            `)
        // F35最佳發射角度為軌道10度，舵機40度。
        // 最佳發射速度為80%，馬達速度204
        Angle = 63
        MoterSpeed = 204
    } else if (Preset == 2) {
        // 顯示幻象2000圖示
        basic.showLeds(`
            . . # . .
            . . # . .
            . # # # .
            . # # # .
            # # # # #
            `)
        // 幻象2000最佳發射角度為軌道20度，舵機63度。
        // 最佳發射速度為100%，馬達速度255
        Angle = 10
        MoterSpeed = 255
    }
    // 設定速度角度參數到設備中。
    SetDevice()
}
// 處理"調整發射軌道角度"相關圖像顯示以及發射參數設定
function DoAngle () {
    if (Angle == 10) {
        basic.showLeds(`
            . # . . .
            # . # . .
            # . # . .
            # # # . .
            # . # . .
            `)
    } else if (Angle == 40) {
        // 圖樣左邊A代表正在"調整發射軌道角度"
        // 
        // 右邊點的數量代表
        // 0度、10度、20度、30度
        // 的發射角度
        basic.showLeds(`
            . # . . .
            # . # . .
            # . # . .
            # # # . .
            # . # . #
            `)
    } else if (Angle == 63) {
        basic.showLeds(`
            . # . . .
            # . # . .
            # . # . .
            # # # . #
            # . # . #
            `)
    } else if (Angle == 90) {
        basic.showLeds(`
            . # . . .
            # . # . .
            # . # . #
            # # # . #
            # . # . #
            `)
    }
    // 設定速度角度參數到設備中。
    SetDevice()
}
// A按鈕用來改變模式
// 在
// 0->最佳飛機發射設定
// 1->調整發射轉輪速度
// 2->調整發射角度
// 3->關機
// 這四種模式中輪流
input.onButtonPressed(Button.A, function () {
    // 如果當下模式為0
    // 則應該前進到Mode1
    // 並且讓顯示器顯示調整發射轉輪時應有的畫面
    // 如果當下模式為1
    // 則應該前進到Mode2
    // 並且讓顯示器顯示調整發射角度時應有的畫面
    // 如果當下模式為2
    // 則應該前進到Mode3 關機
    // 並且讓顯示器顯示關機狀態
    // 如果當下模式為3
    // 則應該前進到Mode0
    // 並且讓顯示器顯示"最佳飛機發射設定"時應有的畫面
    if (Mode == 0) {
        Mode = 1
        DoMotorSpeed()
    } else if (Mode == 1) {
        // Preset:
        // 0->F16 角度10度
        // 1->F35 角度20度
        // 2->幻象2000 角度0度
        Mode = 2
        DoAngle()
    } else if (Mode == 2) {
        // Preset:
        // 0->F16 角度10度
        // 1->F35 角度20度
        // 2->幻象2000 角度0度
        Mode = 3
        DoOFF()
    } else if (Mode == 3) {
        // Preset:
        // 0->F16 角度10度
        // 1->F35 角度20度
        // 2->幻象2000 角度0度
        Mode = 0
        DoPreset()
    }
})
// 處理"調整發射轉輪速度"相關圖像顯示以及發射參數設定
function DoMotorSpeed () {
    if (MoterSpeed == 0) {
        basic.showLeds(`
            # # # . .
            # . . . .
            # # # . .
            . . # . .
            # # # . .
            `)
    } else if (MoterSpeed == 51) {
        // 圖樣左邊S代表正在"調整發射轉輪速度"
        // 
        // 右邊點的數量代表0~100%的轉輪速度
        basic.showLeds(`
            # # # . .
            # . . . .
            # # # . .
            . . # . .
            # # # . #
            `)
    } else if (MoterSpeed == 102) {
        basic.showLeds(`
            # # # . .
            # . . . .
            # # # . .
            . . # . #
            # # # . #
            `)
    } else if (MoterSpeed == 153) {
        basic.showLeds(`
            # # # . .
            # . . . .
            # # # . #
            . . # . #
            # # # . #
            `)
    } else if (MoterSpeed == 204) {
        basic.showLeds(`
            # # # . .
            # . . . #
            # # # . #
            . . # . #
            # # # . #
            `)
    } else if (MoterSpeed == 255) {
        basic.showLeds(`
            # # # . #
            # . . . #
            # # # . #
            . . # . #
            # # # . #
            `)
    } else {
    	
    }
    // 設定速度角度參數到設備中。
    SetDevice()
}
// B按鈕按下時，
// 要先判斷當下是哪個模式，
// 再處裡該模式相關設定值的改變。
// 最後呼叫相應的處理涵式去顯示
// 該有的畫面，和設定參數到設備中。
input.onButtonPressed(Button.B, function () {
    // 當模式為"最佳飛機發射設定"
    // 當模式為"調整發射轉輪速度"
    // 當模式為"調整發射角度"
    if (Mode == 0) {
        // 如果當下為F16最佳發射設定，則前進到F35最佳發射設定。
        // 如果當下為F35最佳發射設定，則前進到幻象2000最佳發射設定。
        // 如果當下為幻象2000最佳發射設定，則前進到F16最佳發射設定。
        if (Preset == 0) {
            // Preset:
            // 0->F16 角度10度
            // 1->F35 角度20度
            // 2->幻象2000 角度0度
            Preset = 1
        } else if (Preset == 1) {
            // Preset:
            // 0->F16 角度10度
            // 1->F35 角度20度
            // 2->幻象2000 角度0度
            Preset = 2
        } else if (Preset == 2) {
            // Preset:
            // 0->F16 角度10度
            // 1->F35 角度20度
            // 2->幻象2000 角度0度
            Preset = 0
        }
        // 顯示相關畫面及設定最佳發射參數到設備中。
        DoPreset()
    } else if (Mode == 1) {
        // 轉輪速度MoterSpeed在
        // 0% -> 設定值 0
        // 20% -> 設定值 51
        // 40% -> 設定值 102
        // 60% -> 設定值 153
        // 80% -> 設定值 204
        // 100% -> 設定值 255
        // 之間循環
        if (MoterSpeed == 0) {
            MoterSpeed = 51
        } else if (MoterSpeed == 51) {
            MoterSpeed = 102
        } else if (MoterSpeed == 102) {
            MoterSpeed = 153
        } else if (MoterSpeed == 153) {
            MoterSpeed = 204
        } else if (MoterSpeed == 204) {
            MoterSpeed = 255
        } else if (MoterSpeed == 255) {
            MoterSpeed = 0
        }
        // 顯示相關畫面及設定速度角度參數到設備中。
        DoMotorSpeed()
    } else if (Mode == 2) {
        // 舵機角度Angle在
        // 10度 -> 發射軌道0度
        // 40度 -> 發射軌道10度
        // 63度 -> 發射軌道20度
        // 90度 -> 發射軌道30度
        // 之間循環
        if (Angle == 10) {
            // Preset:
            // 0->F16 角度10度
            // 1->F35 角度20度
            // 2->幻象2000 角度0度
            Angle = 40
        } else if (Angle == 40) {
            // Preset:
            // 0->F16 角度10度
            // 1->F35 角度20度
            // 2->幻象2000 角度0度
            Angle = 63
        } else if (Angle == 63) {
            // Preset:
            // 0->F16 角度10度
            // 1->F35 角度20度
            // 2->幻象2000 角度0度
            Angle = 90
        } else if (Angle == 90) {
            // Preset:
            // 0->F16 角度10度
            // 1->F35 角度20度
            // 2->幻象2000 角度0度
            Angle = 10
        }
        // 顯示相關畫面及設定速度角度參數到設備中。
        DoAngle()
    }
})
function SetDevice () {
    powerbrick.Servo2KG(powerbrick.Servos.S1, Angle)
    powerbrick.MotorRunDual(MoterSpeed, MoterSpeed)
}
let Angle = 0
let MoterSpeed = 0
let Preset = 0
let Mode = 0
basic.showIcon(IconNames.SmallDiamond)
// Mode模式
// 0->最佳飛機發射設定
// 1->調整發射轉輪速度
// 2->調整發射角度
// 3->關機
Mode = 3
// Preset:
// 0->F16 角度10度，速度80%
// 1->F35 角度20度，速度80%
// 2->幻象2000 角度0度，速度100%
Preset = 0
// MoterSpeed:
// 從0到255，分成五等分。
// 每一等分數值加51，
// 超過255則歸零。
MoterSpeed = 0
// Angl3
// 發射器0度->舵機10度
// 發射器10度->舵機40度
// 發射器20度->舵機63度
// 發射器30度->舵機90度
Angle = 10
DoOFF()
basic.forever(function () {
	
})
