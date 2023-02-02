
var mainScript = function(){
deck1 = [{
    title: "Dragão Branco de Olhos Azuis",
    atk: 3000,
    def: 2500,
    ilustration: "url(../carta/img/ilustracoes_cartas/BlueEyesWhiteDragon.png)"
},
{
    title: "Minerva",
    atk: 2000,
    def: 800,
    ilustration: "url(../carta/img/ilustracoes_cartas/Minerva.png)"
},
{
    title: "Soldado do Lustro Negro",
    atk: 3000,
    def: 2500,
    ilustration: "url(../carta/img/ilustracoes_cartas/LusterSoldier.png)"
},
{
    title: "Cyber Stein",
    atk: 700,
    def: 500,
    ilustration: "url(../carta/img/ilustracoes_cartas/CyberStein.png)"
},
{
    title: "Slifer, o dragão dos céus",
    atk: '4000',
    def: '4000',
    ilustration: "url(../carta/img/ilustracoes_cartas/Slifer.png)"
},
{
    title: "Castor Guerreiro",
    atk: '1200',
    def: '1500',
    ilustration: "url(../carta/img/ilustracoes_cartas/BeaverWarrior.png)"
},
{
    title: "Caveira Invocada",
    atk: '2500',
    def: '1200',
    ilustration: "url(../carta/img/ilustracoes_cartas/CaveiraInvocada.png)"
},
{
    title: "Maldição do Dragão",
    atk: '2000',
    def: '1500',
    ilustration: "url(../carta/img/ilustracoes_cartas/CurseDragon.png)"
},
{
    title: "Diabrete Selvagem",
    atk: '1300',
    def: '1400',
    ilustration: "url(../carta/img/ilustracoes_cartas/FeralImp.png)"
},
{
    title: "Gaia, o Cavaleiro Impetuoso",
    atk: '2300',
    def: '2100',
    ilustration: "url(../carta/img/ilustracoes_cartas/GaiaKnight.png)"
}
]

deck2 = [{
    title: "Mago Negro",
    atk: 2500,
    def: 2100,
    ilustration: "url(../carta/img/ilustracoes_cartas/DarkMagician.png)"
},
{
    title: "Dragão Negro de Olhos Vermelhos",
    atk: 2400,
    def: 2000,
    ilustration: "url(../carta/img/ilustracoes_cartas/RedEyesBDragon.png)"
},
{
    title: "Tyler, o grande guerreiro",
    atk: 3000,
    def: 800,
    ilustration: "url(../carta/img/ilustracoes_cartas/TylerWarrior.png)"
},
{
    title: "Obelisco, o Atormentador",
    atk: 4000,
    def: 4000,
    ilustration: "url(../carta/img/ilustracoes_cartas/ObeliskTheTormentor.png)"
},
{
    title: "Celtic Guardian",
    atk: 1400,
    def: 1200,
    ilustration: "url(../carta/img/ilustracoes_cartas/CelticGuardian.png)"
},
{
    title: "O Grande Branco",
    atk: 1600,
    def: 800,
    ilustration: "url(../carta/img/ilustracoes_cartas/GreatWhite.png)"
},
{
    title: "Cemitério de Mamutes",
    atk: 1200,
    def: 800,
    ilustration: "url(../carta/img/ilustracoes_cartas/MammothGraveyard.png)"
},
{
    title: "Elfa Mística",
    atk: 800,
    def: 2000,
    ilustration: "url(../carta/img/ilustracoes_cartas/MysticalElf.png)"
},
{
    title: "Pote da Ganância",
    atk: 9999,
    def: 9999,
    ilustration: "url(../carta/img/ilustracoes_cartas/PotOfGreed.png)"
},
{
    title: "Dragão Alado, Guardião da Fortaleza N°1",
    atk: 1400,
    def: 1200,
    ilustration: "url(../carta/img/ilustracoes_cartas/WingedDragon.png)"
}
]

var current_phase;
var current_card = undefined,
current_player;
var dorpzone;
var attackInLife1, attackInLife2;

//Fim partida
var endGameMatch = function () {
const $endButtonsBox = document.createElement("div");
$endButtonsBox.setAttribute("id", "endgame-box");
document.body.appendChild($endButtonsBox);

const $endMainMenuButton = document.createElement("div");
$endMainMenuButton.classList = "end_game_button";
$endMainMenuButton.setAttribute("id", "endGame-mainMenu-button");
$endMainMenuButton.innerHTML = "Main Menu";
$endButtonsBox.appendChild($endMainMenuButton);

const $endPlayAgainButton = document.createElement("div");
$endPlayAgainButton.classList = "end_game_button";
$endPlayAgainButton.setAttribute("id", "endGame-playAgain-button");
$endPlayAgainButton.innerHTML = "Play Again";
$endButtonsBox.appendChild($endPlayAgainButton);

$main.style.filter = "brightness(40%)";



$endMainMenuButton.addEventListener("click", createMain_menu);
$endPlayAgainButton.addEventListener("click", createMatch);
}
//

//Main phase puxar 1 carta
var mainPhasePullCard = function (e) {
let bancoPlayer = document.querySelector(`#banco_${e.path[0].getAttribute("data-player")}`);
e.path[0].firstChild.style.display = "block";
bancoPlayer.appendChild(e.path[0].firstChild);
e.path[0].removeEventListener("click", mainPhasePullCard);
}
//

//drop events para eventuais removes
var battle_drop_event = function (e) {
//console.log(e);
if ((e.path[0].getAttribute("data-player") != current_card.getAttribute(
        "data-player")) && (parseInt(e.path[0].getAttribute("data-atk")) < parseInt(
        current_card
        .getAttribute("data-atk"))) && (current_card.getAttribute("draggable") ==
        "true")) {
    e.path[0].parentElement.setAttribute("data-active", "false");
    e.path[0].parentElement.style.opacity = "0.3";
    e.path[0].remove();
    current_card.setAttribute("draggable", "false");

    current_card = null;
} else if ((e.path[0].getAttribute("data-player") != current_card.getAttribute(
        "data-player")) && (parseInt(e.path[0].getAttribute("data-atk")) > parseInt(
        current_card
        .getAttribute("data-atk"))) && (current_card.getAttribute("draggable") ==
        "true")) {
    current_card.parentElement.setAttribute("data-active", "false");
    current_card.parentElement.style.opacity = "0.3";
    current_card.remove();
    current_card = null;
} else {

}
}


var main_drop_event = function (e) {
if ((current_card.getAttribute("draggable") == "false") || dorpzone
    .getAttribute(
        "data-active") == "true") {

} else {
    if (dorpzone.children.length > 0) {
        if (dorpzone.children[0].getAttribute("data-active") == "true") {

        }
    } else {
        if ((dorpzone.getAttribute("data-player") == 1) && (
                current_player == 1)) {

            dorpzone.append(current_card);
            current_card.setAttribute("draggable", "false");
            dorpzone.dataset.active = true;
            dorpzone.style.opacity = "1";

        } else if ((dorpzone.getAttribute("data-player") == 2) && (
                current_player ==
                2)) {

            dorpzone.append(current_card);
            dorpzone.dataset.active = true;
            dorpzone.style.opacity = "1";
            current_card = undefined; ////////////////////////////////// atençao
        }
    }
}

}
//

//player damage drop
var damage_player_drop = function (e) {
let damage_opening = true;
let droppable_player = document.querySelectorAll(
    `.droppable[data-player='${e.path[0].getAttribute("data-player")}']`)
droppable_player.forEach((el) => {
    if (el.getAttribute("data-active") == "true") {
        damage_opening = false;
    }
})

if ((current_card.getAttribute("data-player") != e.path[0].getAttribute("data-player")) && (current_card
        .getAttribute("draggable") == "true") && (damage_opening)) {
    e.path[0].textContent -= current_card.getAttribute("data-atk");
    current_card.setAttribute("draggable", "false");
}

if (e.path[0].textContent <= 0) {
    endGameMatch();
}
}
//


//criando main tela
const $main = document.querySelector("#main");
createMain_menu = function () {
$main.innerHTML = "";
if (document.querySelector("#endgame-box") == null) {

} else {
    document.querySelector("#endgame-box").remove();
    $main.style.filter = "brightness(100%)";
}


const $main_buttons = document.createElement("div");
$main_buttons.classList.add("main_buttons");
$main.appendChild($main_buttons);

const $play_button = document.createElement('div');
const $edit_button = document.createElement('div');
$play_button.classList.add("play_button");
$edit_button.classList.add("edit_button");
$play_button.innerHTML = "PLAY";
$edit_button.innerHTML = "EDIT DECK";

$main_buttons.appendChild($play_button);
$main_buttons.appendChild($edit_button);

$play_button.addEventListener("click", createMatch, false);
$edit_button.addEventListener("click", editDeck, false);

}
//




mainPhase = function (life1, life2) {
/*var data_active_false = document.querySelectorAll(".droppable[data-active=true]")
data_active_false.forEach((e) => {
    e.removeEventListener("drop", (e))
    e.setAttribute("data-active", "false")
})*/


// arrrastas cartas draggable
let $div_player2 = document.querySelectorAll("#banco_1>div");
let $div_player1 = document.querySelectorAll("#banco_2>div");

$div_player2.forEach((draggable_card, i) => {

    draggable_card.setAttribute("draggable", "true");

    draggable_card.addEventListener("dragstart", (e) => {
        current_card = draggable_card;
        current_player = draggable_card.getAttribute("data-player");

    }, false);
    draggable_card.addEventListener("drag", (e) => {

    }, false);
    draggable_card.addEventListener("dragend", (e) => {

    }, false)


});

$div_player1.forEach((draggable_card, i) => {

    draggable_card.setAttribute("draggable", "true");

    draggable_card.addEventListener("dragstart", (e) => {
        current_card = draggable_card;
        current_player = draggable_card.getAttribute("data-player");

    }, false);
    draggable_card.addEventListener("drag", (e) => {

    }, false);
    draggable_card.addEventListener("dragend", (e) => {

    }, false)


    //
});

//arrrasta alvos droppable

const $dropzone = document.querySelectorAll(".droppable");
$dropzone.forEach((dropzone) => {

    dropzone.addEventListener("dragenter", (e) => {
        e.preventDefault();
    });

    dropzone.addEventListener("dragleave", (e) => {
        e.preventDefault();
    });

    dropzone.addEventListener("dragover", (e) => {
        dorpzone = dropzone;
        e.preventDefault();
    });

    dropzone.addEventListener("drop", main_drop_event);
});
//

const deckStoragesMainPhase = document.querySelectorAll(".deck-storage");
deckStoragesMainPhase.forEach((el) => {
    el.addEventListener("click", mainPhasePullCard);
});
current_phase = "battle";

}
battlePhase = function (life1, life2) {

const disable_droppables = document.querySelectorAll(".droppable");
disable_droppables.forEach((e) => {
    e.removeEventListener("drop", (e), false);
    //

})

const disable_card_pull = document.querySelectorAll(".deck-storage");
disable_card_pull.forEach((e) => {
    e.removeEventListener("click", mainPhasePullCard);
})

//desabilita bancos
const disable_banco = document.querySelectorAll(".bancos>div");
disable_banco.forEach((e) => {
    e.setAttribute("draggable", "false");

})
//



const active_card = document.querySelectorAll('.droppable[data-active]>div');

//


active_card.forEach((active_card_drag) => {
    active_card_drag.setAttribute("draggable", "true");


    active_card_drag.addEventListener("dragstart", (e) => {
        current_card = active_card_drag;
        current_player = active_card_drag.getAttribute("data-player");

    }, false);
    active_card_drag.addEventListener("drag", (e) => {

    }, false);
    active_card_drag.addEventListener("dragend", (e) => {

    }, false)


    active_card_drag.addEventListener("dragenter", (e) => {
        e.preventDefault();
    });

    active_card_drag.addEventListener("dragleave", (e) => {
        e.preventDefault();
    });

    active_card_drag.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    active_card_drag.addEventListener("drop", battle_drop_event);
})

//attack in player life
/*attackInLife1 = function () {
    if(current_card.getAttribute("data-player")!=  )
}*/

//

//drop life
let life_player_1 = document.querySelector(".lifePlayer[data-player='1']");
let life_player_2 = document.querySelector(".lifePlayer[data-player='2']");



life_player_1.addEventListener("dragenter", (e) => {
    e.preventDefault();
});
life_player_1.addEventListener("dragleave", (e) => {
    e.preventDefault();
});
life_player_1.addEventListener("dragover", (e) => {
    e.preventDefault();
});
life_player_1.addEventListener("drop", damage_player_drop);





life_player_2.addEventListener("dragenter", (e) => {
    e.preventDefault();
});
life_player_2.addEventListener("dragleave", (e) => {
    e.preventDefault();
});
life_player_2.addEventListener("dragover", (e) => {
    e.preventDefault();
});
life_player_2.addEventListener("drop", damage_player_drop);


current_phase = "main";
}


createMatch = function () {
current_phase = "main";
var deckCount = 0;
var lifePlayer1 = 8000;
var lifePlayer2 = 8000;

//limpa tela
const $main_buttons = document.querySelector(".main_buttons");
if ($main_buttons == null) {
    document.querySelector("#endgame-box").remove();
    $main.style.filter = "brightness(100%)";
    $main.innerHTML = "";
} else {
    $main_buttons.remove();
}
//

//Criando deck storages
const $deckStorage1 = document.createElement("div");
$deckStorage1.classList.add("deck-storage");
$deckStorage1.setAttribute("data-player", "1");

const $deckStorage2 = document.createElement("div");
$deckStorage2.classList.add("deck-storage");
$deckStorage2.setAttribute("data-player", "2");

const $deckStorageBoxHalf1 = document.createElement("div");
$deckStorageBoxHalf1.classList.add("deck-storage-box-half");
$deckStorageBoxHalf1.setAttribute("data-player", "1");

const $deckStorageBoxHalf2 = document.createElement("div");
$deckStorageBoxHalf2.classList.add("deck-storage-box-half");
$deckStorageBoxHalf2.setAttribute("data-player", "2");

const $deckStorageBox = document.createElement("div");
$deckStorageBox.setAttribute("id", "deck-storage-box");


$deckStorageBoxHalf1.appendChild($deckStorage1);
$deckStorageBoxHalf2.appendChild($deckStorage2);
$deckStorageBox.appendChild($deckStorageBoxHalf2);
$deckStorageBox.appendChild($deckStorageBoxHalf1);
$main.appendChild($deckStorageBox);
//

//criaçao das vidas dos jogadores
const $life_player_1 = document.createElement("div");
const $life_player_2 = document.createElement("div");

$life_player_1.classList = "lifePlayer";
$life_player_2.classList = "lifePlayer";

$life_player_1.setAttribute("data-player", "1");
$life_player_2.setAttribute("data-player", "2");

$life_player_1.innerHTML = lifePlayer1;
$life_player_2.innerHTML = lifePlayer2;



$main.appendChild($life_player_1);
$main.appendChild($life_player_2);
//

//criar arena
const $arena = document.createElement("div");
$arena.setAttribute("id", "arena");
$main.appendChild($arena);

const $arena_droppable = document.createElement("div");
$arena_droppable.setAttribute("id", "arena_droppable");
$main.appendChild($arena_droppable);
//

//criar arena players
const $arena_player1 = document.createElement("div");
$arena_player1.classList.add("arena_players");
$arena_player1.setAttribute("id", "arena_player1");
$arena_droppable.appendChild($arena_player1);



const $arena_player2 = document.createElement("div");
$arena_player2.classList.add("arena_players")
$arena_player2.setAttribute("id", "arena_player2");
$arena_droppable.appendChild($arena_player2);
//

//criando espaços para carta na arena - player 1, player2
for (i = 0; i < 5; i++) {
    let $div_arena = document.createElement("div");
    $div_arena.classList.add("droppable");
    $div_arena.dataset.player = "2";
    $arena_player1.appendChild($div_arena);
}

for (i = 0; i < 5; i++) {
    let $div_arena = document.createElement("div");
    $div_arena.classList.add("droppable");
    $div_arena.dataset.player = "1"
    $arena_player2.appendChild($div_arena);
}
//




//cricao bancos player 1, player2
const $banco_1 = document.createElement("div");
$banco_1.classList.add("bancos");
$banco_1.setAttribute("id", "banco_1");


const $banco_2 = document.createElement("div");
$banco_2.classList.add("bancos");
$banco_2.setAttribute("id", "banco_2");


$arena.appendChild($banco_2);
$arena.appendChild($banco_1);

deck1.forEach((el, i) => {
    let $div = document.createElement("div");
    $div.dataset.name = el.title;
    $div.dataset.player = "2";
    $div.dataset.atk = el.atk;
    $div.dataset.def = el.def;
    $div.style.backgroundImage = el.ilustration;
    $div.style.width = "139px";
    $div.style.height = "203px";
    $div.style.backgroundSize = "cover";
    $div.style.transform = "scaleY(-1)";

    $div.addEventListener("mouseover", (e) => {
        amplia_carta.style.backgroundImage = el.ilustration;
    })

    $div.addEventListener("mouseleave", (e) => {
        amplia_carta.style.backgroundImage = "none";
    })

    if (deckCount < 4) {
        $banco_2.appendChild($div);
    } else {
        $div.style.display = "none";
        const $deckStorage = document.querySelector(".deck-storage[data-player='2'");
        $deckStorage.appendChild($div);
    }
    deckCount++;
})
deckCount = 0;
deck2.forEach((el, i) => {
    let $div = document.createElement("div");
    $div.dataset.name = el.title;
    $div.dataset.player = "1";
    $div.dataset.atk = el.atk;
    $div.dataset.def = el.def;
    $div.style.backgroundImage = el.ilustration;
    $div.style.width = "139px";
    $div.style.height = "203px";
    $div.style.backgroundSize = "cover";
    $div.style.transform = "scaleY(1)"

    $div.addEventListener("mouseover", (e) => {
        amplia_carta.style.backgroundImage = el.ilustration;
    })

    $div.addEventListener("mouseleave", (e) => {
        amplia_carta.style.backgroundImage = "none";
    })

    $div.setAttribute("draggable", "true");

    if (deckCount < 4) {
        $banco_1.appendChild($div);
    } else {
        $div.style.display = "none";
        const $deckStorage = document.querySelector(".deck-storage[data-player='1'");
        $deckStorage.appendChild($div);
    }
    deckCount++;
})

//botao battle phase
const $passPhase = document.createElement("div");
$passPhase.setAttribute("id", "passPhase_button");
$passPhase.innerHTML = "Main Phase";
$passPhase.addEventListener("click", (e) => {
    if (current_phase == "main") {

        let disable_battle_drop = document.querySelectorAll(".droppable");
        disable_battle_drop.forEach((el) => {
            el.removeEventListener("drop", battle_drop_event);
        })

        let disable_active_cards = document.querySelectorAll(".droppable[data-active=true]");
        disable_active_cards.forEach((disable) => {
            if (disable.children.length == 0) {
                disable.setAttribute("data-active", "false")
            }
        })

        let disable_life_damage = document.querySelectorAll(".box-playerLife");
        disable_life_damage.forEach((disable) => {
            disable.removeEventListener("drop", damage_player_drop);
        })

        mainPhase(lifePlayer1, lifePlayer2);
        $passPhase.innerHTML = "Battle Phase";
    } else {

        let disable_main_drop = document.querySelectorAll(".droppable");
        disable_main_drop.forEach((el) => {
            el.removeEventListener("drop", main_drop_event);
        })

        battlePhase(lifePlayer1, lifePlayer2);
        $passPhase.innerHTML = "Main Phase";
    }
}, false)
$main.appendChild($passPhase);
//

//criaçao do amplia carta (zoom lateral das cartas)
const amplia_carta = document.createElement('div');
amplia_carta.classList = "amplia_carta";
$main.appendChild(amplia_carta);
//



}
editDeck = function () {
const $main_buttons = document.querySelector(".main_buttons")
$main_buttons.remove();


}

createMain_menu();
}