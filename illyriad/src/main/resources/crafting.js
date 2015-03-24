
(function()
{
    // current number of tables used for minerals, herbs or animal parts
    // it depends on available page width
    var g_numberOfTables = -1;

    // usage dictionary - filled during start
    var g_Usage = {};

    // recipe data
    // <number>:code|<number>:code
    var g_Recipes = {};
    g_Recipes['33'] = '1:1|5:183|5:186|1:417|10:416';
    g_Recipes['36'] = '1:1|10:183|1:186|1:417|5:416';
    g_Recipes['34'] = '1:1|20:183|1:186|3:417|1:416';
    g_Recipes['37'] = '1:1|20:183|3:186|1:417|1:416';
    g_Recipes['35'] = '1:1|20:183|1:186|1:417|3:416';
    g_Recipes['422'] = '1:1|20:183|5:416';
    g_Recipes['423'] = '1:1|20:183|5:416';
    g_Recipes['424'] = '1:1|20:183|5:417';
    g_Recipes['425'] = '1:1|20:183|5:186';

    g_Recipes['91'] = '1:5|10:183|1:334|1:416';
    g_Recipes['92'] = '1:5|10:183|1:359|1:416';
    g_Recipes['93'] = '5:17|10:21|1:5|10:183|1:416|1:246';
    g_Recipes['94'] = '1:5|10:183|1:382|1:416';
    g_Recipes['95'] = '1:5|10:183|1:416|1:247|1:293';
    g_Recipes['96'] = '1:5|10:183|1:357|1:416';
    g_Recipes['97'] = '1:5|10:183|1:416|1:246|1:290';
    g_Recipes['98'] = '1:5|10:183|1:311|1:416';
    g_Recipes['99'] = '25:295|1:5|10:183|1:416|1:232';
    g_Recipes['100'] = '5:21|1:5|10:183|1:336|1:416';
    g_Recipes['101'] = '1:5|10:183|1:388|1:416';
    g_Recipes['102'] = '1:5|10:183|1:341|1:416';
    g_Recipes['103'] = '1:5|10:183|1:308|1:416|1:293';
    g_Recipes['104'] = '1:5|10:183|1:411|1:416';
    g_Recipes['105'] = '5:21|1:5|10:183|1:210|1:416|1:293';
    g_Recipes['106'] = '1:5|10:183|1:411|1:416|1:293';
    g_Recipes['107'] = '1:5|10:183|1:304|1:416';
    g_Recipes['108'] = '1:5|10:183|1:210|1:416';
    g_Recipes['109'] = '1:5|10:183|1:320|1:416';
    g_Recipes['110'] = '1:5|10:183|1:207|1:416|1:293';
    g_Recipes['111'] = '1:5|10:183|1:415|1:416';
    g_Recipes['112'] = '1:5|10:183|1:395|1:416';
    g_Recipes['113'] = '1:5|10:183|1:346';
    g_Recipes['114'] = '1:5|10:183|1:212|1:416|1:293';
    g_Recipes['115'] = '1:5|10:183|1:210|1:416|1:246';
    g_Recipes['116'] = '1:5|10:183|1:186|2:417|1:416';

    g_Recipes['40'] = '1:3|10:183|1:411|1:417';
    g_Recipes['41'] = '1:3|10:183|1:395|1:417';
    g_Recipes['42'] = '1:3|10:183|1:382|1:417';
    g_Recipes['43'] = '1:3|10:183|1:409|1:417';
    g_Recipes['44'] = '1:3|10:183|1:376|1:417';
    g_Recipes['45'] = '5:17|1:3|5:183|1:417';
    g_Recipes['46'] = '25:295|1:3|10:183|1:417|1:232';
    g_Recipes['47'] = '1:3|5:183|1:417';
    g_Recipes['48'] = '1:3|10:183|1:336|1:417';
    g_Recipes['50'] = '1:3|10:183|1:417|1:210';
    g_Recipes['51'] = '1:3|10:183|1:359|1:417';
    g_Recipes['52'] = '1:3|10:183|1:409|1:417';
    g_Recipes['53'] = '1:3|10:183|1:314|1:417';
    g_Recipes['54'] = '1:3|10:183|1:417|1:207|1:292';
    g_Recipes['55'] = '1:3|10:183|1:414|1:417|1:292';
    g_Recipes['56'] = '1:3|5:183|1:417';
    g_Recipes['57'] = '1:3|10:183|1:346';
    g_Recipes['58'] = '1:3|10:183|1:417|1:193|1:292';
    g_Recipes['59'] = '1:3|10:183|1:415|1:417';
    g_Recipes['60'] = '1:3|10:183|1:409|1:417';
    g_Recipes['61'] = '1:3|10:183|1:311|1:417';
    g_Recipes['62'] = '1:3|10:183|1:341|1:417';
    g_Recipes['63'] = '1:3|10:183|1:417|1:212|1:292';
    g_Recipes['64'] = '1:3|10:183|1:417|1:210|1:292';
    g_Recipes['65'] = '1:3|5:183|1:417';
    g_Recipes['49'] = '5:17|1:3|10:183|1:417|1:193';

    g_Recipes['67'] = '1:4|10:183|1:334|1:416';
    g_Recipes['68'] = '1:4|10:183|1:397|1:416|1:290';
    g_Recipes['76'] = '1:4|10:183|3:186|1:417|1:416|1:290';
    g_Recipes['69'] = '1:4|10:183|1:357|1:416';
    g_Recipes['70'] = '25:295|1:4|10:183|1:416|1:232|1:290';
    g_Recipes['71'] = '50:295|10:296|1:4|10:183|1:416|1:226';
    g_Recipes['72'] = '1:4|10:183|1:314|1:417|1:416|1:290';
    g_Recipes['73'] = '1:4|10:183|1:320|1:416';
    g_Recipes['74'] = '1:4|10:183|1:411|1:416';
    g_Recipes['75'] = '1:4|10:183|1:341|1:416';
    g_Recipes['77'] = '1:4|10:183|1:304|1:416';
    g_Recipes['78'] = '1:4|10:183|1:362|1:416|1:290';
    g_Recipes['79'] = '1:4|10:183|1:416';
    g_Recipes['80'] = '1:4|10:183|1:415|1:416';
    g_Recipes['81'] = '1:4|10:183|1:370|1:416|1:290';
    g_Recipes['82'] = '1:4|10:183|1:382|1:416';
    g_Recipes['83'] = '1:4|10:183|1:320|1:416';
    g_Recipes['84'] = '1:4|10:183|1:395|1:416';
    g_Recipes['85'] = '1:4|10:183|1:416|1:226';
    g_Recipes['86'] = '1:4|10:183|1:311|1:416';
    g_Recipes['87'] = '1:4|10:183|1:416|1:225|1:224';
    g_Recipes['88'] = '10:17|5:21|1:4|10:183|1:186|1:417|2:416';
    g_Recipes['89'] = '1:4|10:183|1:341|1:416';

    g_Recipes['120'] = '50:295|1:8|10:183|1:186|1:338|1:375|1:394';
    g_Recipes['121'] = '1:8|10:183|1:186|1:249';
    g_Recipes['122'] = '1:8|10:183|1:186|1:251';
    g_Recipes['123'] = '2:8|20:183|1:186|1:250|1:291';
    g_Recipes['124'] = '1:8|20:183|1:186|1:399';
    g_Recipes['125'] = '1:8|10:183|1:186|1:394';
    g_Recipes['126'] = '1:8|10:183|1:186|1:401';
    g_Recipes['127'] = '1:8|10:183|1:186|1:250';
    g_Recipes['128'] = '2:8|10:183|2:186|1:416';
    g_Recipes['129'] = '1:8|10:183|1:186|1:338';
    g_Recipes['130'] = '1:8|10:183|1:186|1:354';
    g_Recipes['131'] = '1:8|10:183|1:186|1:399';
    g_Recipes['132'] = '1:8|10:183|1:186|1:318|1:291';
    g_Recipes['133'] = '1:8|10:183|1:186|1:248';
    g_Recipes['134'] = '1:8|10:183|1:186|1:343';
    g_Recipes['135'] = '20:21|1:8|10:183|1:186';
    g_Recipes['136'] = '1:8|10:183|1:186|1:210';
    g_Recipes['137'] = '50:295|1:8|10:183|1:186|1:291';
    g_Recipes['138'] = '1:8|10:183|1:186|1:375';
    g_Recipes['139'] = '1:8|10:183|1:186|1:417|1:210';

    g_Recipes['141'] = '1:9|10:183|1:417|1:249';
    g_Recipes['142'] = '1:9|10:183|1:417|1:251';
    g_Recipes['143'] = '10:21|1:9|10:183|3:417';
    g_Recipes['144'] = '20:21|1:9|20:183|1:186|3:417|1:291';
    g_Recipes['145'] = '1:9|20:183|1:186|1:417|1:210';
    g_Recipes['146'] = '1:9|10:183|1:307|1:417';
    g_Recipes['147'] = '10:21|1:9|10:183|2:417';
    g_Recipes['148'] = '1:9|10:183|1:338|1:417';
    g_Recipes['149'] = '1:9|10:183|1:375|1:417';
    g_Recipes['150'] = '1:9|10:183|1:354|1:417';
    g_Recipes['151'] = '1:9|10:183|1:417|1:210';
    g_Recipes['152'] = '1:9|50:183|1:186|1:417|1:210|1:250|1:251';
    g_Recipes['153'] = '1:9|10:183|1:417|1:248';
    g_Recipes['154'] = '1:9|10:183|1:394|1:417';
    g_Recipes['155'] = '1:9|10:183|1:417|1:210';
    g_Recipes['156'] = '1:9|10:183|1:186|1:417|1:212|1:291';
    g_Recipes['157'] = '10:21|1:9|10:183|1:417|1:193';
    g_Recipes['158'] = '1:9|10:183|2:186|1:417|1:416';
    g_Recipes['159'] = '1:9|10:183|1:394|1:417';

    g_Recipes['161'] = '50:295|1:10|10:183|1:186|1:417|1:291';
    g_Recipes['162'] = '20:21|1:10|10:183|1:186|1:417';
    g_Recipes['163'] = '1:10|10:183|1:417|1:251';
    g_Recipes['164'] = '1:10|10:183|1:186|1:417|1:193|1:212|1:291';
    g_Recipes['165'] = '1:10|10:183|1:394|1:417';
    g_Recipes['166'] = '1:10|10:183|1:378|1:417';
    g_Recipes['167'] = '20:21|1:10|10:183|4:417';
    g_Recipes['168'] = '1:10|10:183|1:338|1:417';
    g_Recipes['169'] = '1:10|10:183|1:354|1:417';
    g_Recipes['170'] = '1:10|10:183|1:417|1:210';
    g_Recipes['171'] = '1:10|10:183|1:186|1:417|1:207|1:291';
    g_Recipes['172'] = '1:10|10:183|1:343|1:417';
    g_Recipes['173'] = '1:10|10:183|1:417|1:210';
    g_Recipes['174'] = '1:10|10:183|1:186|1:417|1:212|1:291';
    g_Recipes['175'] = '30:21|1:10|10:183|1:336|1:417';
    g_Recipes['176'] = '50:21|1:10|10:183|1:417';
    g_Recipes['177'] = '1:10|10:183|1:417|1:248';
    g_Recipes['178'] = '1:10|10:183|1:375|1:417';
    g_Recipes['179'] = '1:10|10:183|2:186|2:417';

    // effects data
    var g_Effects = {};
    g_Effects['33'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+25</span>%&nbsp;Move&nbsp;Speed)</b> for Siege Engines</div>';
    g_Effects['36'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+25</span>%&nbsp;Move&nbsp;Speed)</b> for Swordsmen, Archers and Spearmen</div>';
    g_Effects['34'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+5</span>%&nbsp;Attack, <span style="color:#860008">-5</span>%&nbsp;Move&nbsp;Speed, <span style="color:#004B00">+10</span>%&nbsp;Carry, <span style="color:#860008">-5</span>%&nbsp;on&nbsp;Hills, <span style="color:#860008">-5</span>%&nbsp;on&nbsp;Mountains, <span style="color:#860008">-5</span>%&nbsp;in&nbsp;Forests, <span style="color:#860008">-5</span>%&nbsp;in&nbsp;Arctic, <span style="color:#860008">-5</span>%&nbsp;in&nbsp;Desert, <span style="color:#860008">-5</span>%&nbsp;in&nbsp;Jungle)</b> for Cavalry</div>';
    g_Effects['37'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+5</span>%&nbsp;Magic&nbsp;Res)</b></div>';
    g_Effects['35'] = '<div style="text-align:left"><b>(<span style="color:#860008">-8</span>%&nbsp;Attack, <span style="color:#004B00">+24</span>%&nbsp;Cav&nbsp;Def, <span style="color:#004B00">+24</span>%&nbsp;Spear&nbsp;Def, <span style="color:#004B00">+24</span>%&nbsp;Bow&nbsp;Def, <span style="color:#004B00">+24</span>%&nbsp;Sword&nbsp;Def)</b> for Cavalry</div>';
    g_Effects['422'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+15</span>%&nbsp;Move&nbsp;Speed, <span style="color:#860008">-20</span>%&nbsp;for&nbsp;Dwarves, <span style="color:#860008">-20</span>%&nbsp;for&nbsp;Humans, <span style="color:#860008">-20</span>%&nbsp;for&nbsp;Orcs)</b></div>';
    g_Effects['423'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+20</span>%&nbsp;Cav&nbsp;Def, <span style="color:#004B00">+20</span>%&nbsp;Spear&nbsp;Def, <span style="color:#004B00">+20</span>%&nbsp;Bow&nbsp;Def, <span style="color:#004B00">+20</span>%&nbsp;Sword&nbsp;Def, <span style="color:#860008">-5</span>%&nbsp;on&nbsp;Hills, <span style="color:#860008">-15</span>%&nbsp;on&nbsp;Mountains, <span style="color:#860008">-10</span>%&nbsp;in&nbsp;Forests, <span style="color:#860008">-5</span>%&nbsp;in&nbsp;Arctic, <span style="color:#860008">-5</span>%&nbsp;in&nbsp;Desert, <span style="color:#860008">-5</span>%&nbsp;in&nbsp;Jungle, <span style="color:#860008">-20</span>%&nbsp;for&nbsp;Dwarves, <span style="color:#860008">-20</span>%&nbsp;for&nbsp;Elves, <span style="color:#860008">-20</span>%&nbsp;for&nbsp;Orcs)</b></div>';
    g_Effects['424'] = '<div style="text-align:left"><b>(<span style="color:#860008">-5</span>%&nbsp;Attack, <span style="color:#860008">-10</span>%&nbsp;Move&nbsp;Speed, <span style="color:#004B00">+20</span>%&nbsp;on&nbsp;Hills, <span style="color:#004B00">+20</span>%&nbsp;on&nbsp;Mountains, <span style="color:#860008">-20</span>%&nbsp;for&nbsp;Elves, <span style="color:#860008">-20</span>%&nbsp;for&nbsp;Humans, <span style="color:#860008">-20</span>%&nbsp;for&nbsp;Orcs)</b></div>';
    g_Effects['425'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+10</span>%&nbsp;Move&nbsp;Speed, <span style="color:#004B00">+20</span>%&nbsp;Carry, <span style="color:#004B00">+20</span>%&nbsp;on&nbsp;Hills, <span style="color:#860008">-20</span>%&nbsp;for&nbsp;Dwarves, <span style="color:#860008">-20</span>%&nbsp;for&nbsp;Elves, <span style="color:#860008">-20</span>%&nbsp;for&nbsp;Humans)</b></div>';

    g_Effects['91'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+6</span>%&nbsp;in&nbsp;Arctic, <span style="color:#860008">-4</span>%&nbsp;in&nbsp;Desert, <span style="color:#860008">-4</span>%&nbsp;in&nbsp;Jungle)</b></div>';
    g_Effects['92'] = '<div style="text-align:left"><b>(<span style="color:#860008">-8</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-8</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-8</span>%&nbsp;Bow&nbsp;Def, <span style="color:#004B00">+16</span>%&nbsp;Sword&nbsp;Def)</b></div>';
    g_Effects['93'] = '<div style="text-align:left"><b>(<span style="color:#860008">-8</span>%&nbsp;Attack, <span style="color:#860008">-2</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-2</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-2</span>%&nbsp;Sword&nbsp;Def, <span style="color:#004B00">+24</span>%&nbsp;vs&nbsp;Animals)</b></div>';
    g_Effects['94'] = '<div style="text-align:left"><b>(<span style="color:#860008">-8</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-8</span>%&nbsp;Spear&nbsp;Def, <span style="color:#004B00">+16</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-8</span>%&nbsp;Sword&nbsp;Def)</b></div>';
    g_Effects['95'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+4</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-8</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-8</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-8</span>%&nbsp;Sword&nbsp;Def, <span style="color:#004B00">+8</span>%&nbsp;in&nbsp;Desert, <span style="color:#860008">-8</span>%&nbsp;in&nbsp;Jungle)</b></div>';
    g_Effects['96'] = '<div style="text-align:left"><b>(<span style="color:#860008">-4</span>%&nbsp;in&nbsp;Arctic, <span style="color:#004B00">+6</span>%&nbsp;in&nbsp;Desert, <span style="color:#860008">-4</span>%&nbsp;in&nbsp;Jungle)</b></div>';
    g_Effects['97'] = '<div style="text-align:left"><b>(<span style="color:#860008">-8</span>%&nbsp;Attack, <span style="color:#860008">-4</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-4</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-4</span>%&nbsp;Sword&nbsp;Def, <span style="color:#860008">-5</span>%&nbsp;Move&nbsp;Speed, <span style="color:#004B00">+30</span>%&nbsp;vs&nbsp;Monsterous)</b></div>';
    g_Effects['98'] = '<div style="text-align:left"><b>(<span style="color:#860008">-8</span>%&nbsp;Cav&nbsp;Def, <span style="color:#004B00">+16</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-8</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-8</span>%&nbsp;Sword&nbsp;Def)</b></div>';
    g_Effects['99'] = '<div style="text-align:left"><b>(<span style="color:#860008">-2</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-2</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-2</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-2</span>%&nbsp;Sword&nbsp;Def, <span style="color:#004B00">+12</span>%&nbsp;vs&nbsp;Undead)</b></div>';
    g_Effects['100'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+2</span>%&nbsp;Attack, <span style="color:#860008">-4</span>%&nbsp;Cav&nbsp;Def, <span style="color:#004B00">+12</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-4</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-16</span>%&nbsp;Sword&nbsp;Def)</b></div>';
    g_Effects['101'] = '<div style="text-align:left"><b>(<span style="color:#860008">-12</span>%&nbsp;Cav&nbsp;Def, <span style="color:#004B00">+8</span>%&nbsp;Spear&nbsp;Def, <span style="color:#004B00">+4</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-12</span>%&nbsp;Sword&nbsp;Def, <span style="color:#004B00">+5</span>%&nbsp;Move&nbsp;Speed, <span style="color:#004B00">+8</span>%&nbsp;vs&nbsp;Animals)</b></div>';
    g_Effects['102'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+4</span>%&nbsp;on&nbsp;Hills, <span style="color:#860008">-12</span>%&nbsp;on&nbsp;Plains, <span style="color:#860008">-12</span>%&nbsp;on&nbsp;Mountains, <span style="color:#004B00">+12</span>%&nbsp;in&nbsp;Forests)</b></div>';
    g_Effects['103'] = '<div style="text-align:left"><b>(<span style="color:#860008">-4</span>%&nbsp;Attack, <span style="color:#860008">-8</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-8</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-8</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-8</span>%&nbsp;Sword&nbsp;Def, <span style="color:#004B00">+5</span>%&nbsp;Move&nbsp;Speed, <span style="color:#004B00">+4</span>%&nbsp;in&nbsp;Arctic, <span style="color:#860008">-2</span>%&nbsp;in&nbsp;Desert, <span style="color:#860008">-2</span>%&nbsp;in&nbsp;Jungle, <span style="color:#004B00">+20</span>%&nbsp;vs&nbsp;Animals)</b></div>';
    g_Effects['104'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+12</span>%&nbsp;on&nbsp;Hills, <span style="color:#004B00">+4</span>%&nbsp;on&nbsp;Plains, <span style="color:#860008">-12</span>%&nbsp;on&nbsp;Mountains, <span style="color:#860008">-12</span>%&nbsp;in&nbsp;Forests)</b></div>';
    g_Effects['105'] = '<div style="text-align:left"><b>(<span style="color:#860008">-2</span>%&nbsp;Attack, <span style="color:#004B00">+8</span>%&nbsp;Cav&nbsp;Def, <span style="color:#004B00">+8</span>%&nbsp;Sword&nbsp;Def, <span style="color:#860008">-5</span>%&nbsp;Move&nbsp;Speed, <span style="color:#004B00">+2</span>%&nbsp;for&nbsp;Orcs, <span style="color:#004B00">+12</span>%&nbsp;vs&nbsp;Monsterous)</b></div>';
    g_Effects['106'] = '<div style="text-align:left"><b>(<span style="color:#860008">-2</span>%&nbsp;Attack, <span style="color:#860008">-6</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-6</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-6</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-6</span>%&nbsp;Sword&nbsp;Def, <span style="color:#004B00">+10</span>%&nbsp;Move&nbsp;Speed, <span style="color:#860008">-2</span>%&nbsp;in&nbsp;Arctic, <span style="color:#860008">-2</span>%&nbsp;in&nbsp;Desert, <span style="color:#004B00">+4</span>%&nbsp;in&nbsp;Jungle, <span style="color:#004B00">+18</span>%&nbsp;vs&nbsp;Animals)</b></div>';
    g_Effects['107'] = '<div style="text-align:left"><b>(<span style="color:#860008">-4</span>%&nbsp;in&nbsp;Arctic, <span style="color:#860008">-4</span>%&nbsp;in&nbsp;Desert, <span style="color:#004B00">+6</span>%&nbsp;in&nbsp;Jungle)</b></div>';
    g_Effects['108'] = '<div style="text-align:left"><b>(<span style="color:#860008">-8</span>%&nbsp;Attack, <span style="color:#004B00">+10</span>%&nbsp;Move&nbsp;Speed)</b></div>';
    g_Effects['109'] = '<div style="text-align:left"><b>(<span style="color:#860008">-12</span>%&nbsp;on&nbsp;Hills, <span style="color:#860008">-12</span>%&nbsp;on&nbsp;Plains, <span style="color:#004B00">+12</span>%&nbsp;on&nbsp;Mountains, <span style="color:#004B00">+4</span>%&nbsp;in&nbsp;Forests)</b></div>';
    g_Effects['110'] = '<div style="text-align:left"><b>(<span style="color:#860008">-4</span>%&nbsp;Sword&nbsp;Def, <span style="color:#004B00">+10</span>%&nbsp;Magic&nbsp;Res, <span style="color:#860008">-4</span>%&nbsp;vs&nbsp;Monsterous, <span style="color:#004B00">+4</span>%&nbsp;vs&nbsp;Undead)</b></div>';
    g_Effects['111'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+16</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-8</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-8</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-8</span>%&nbsp;Sword&nbsp;Def)</b></div>';
    g_Effects['112'] = '<div style="text-align:left"><b>(<span style="color:#860008">-12</span>%&nbsp;on&nbsp;Hills, <span style="color:#004B00">+12</span>%&nbsp;on&nbsp;Plains, <span style="color:#004B00">+4</span>%&nbsp;on&nbsp;Mountains, <span style="color:#860008">-12</span>%&nbsp;in&nbsp;Forests)</b></div>';
    g_Effects['113'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+2</span>%&nbsp;Attack, <span style="color:#004B00">+2</span>%&nbsp;Cav&nbsp;Def, <span style="color:#004B00">+2</span>%&nbsp;Spear&nbsp;Def, <span style="color:#004B00">+2</span>%&nbsp;Bow&nbsp;Def, <span style="color:#004B00">+2</span>%&nbsp;Sword&nbsp;Def)</b></div>';
    g_Effects['114'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+10</span>%&nbsp;Attack, <span style="color:#004B00">+5</span>%&nbsp;Cav&nbsp;Def, <span style="color:#004B00">+5</span>%&nbsp;Sword&nbsp;Def)</b></div>';
    g_Effects['115'] = '<div style="text-align:left"><b>(<span style="color:#860008">-2</span>%&nbsp;Attack, <span style="color:#860008">-2</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-2</span>%&nbsp;Bow&nbsp;Def, <span style="color:#004B00">+12</span>%&nbsp;Sword&nbsp;Def, <span style="color:#860008">-1</span>%&nbsp;in&nbsp;Arctic, <span style="color:#860008">-1</span>%&nbsp;in&nbsp;Desert, <span style="color:#004B00">+2</span>%&nbsp;in&nbsp;Jungle)</b></div>';
    g_Effects['116'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+6</span>%&nbsp;Attack, <span style="color:#860008">-15</span>%&nbsp;Move&nbsp;Speed)</b></div>';

    g_Effects['40'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+12</span>%&nbsp;on&nbsp;Hills, <span style="color:#004B00">+4</span>%&nbsp;on&nbsp;Plains, <span style="color:#860008">-12</span>%&nbsp;on&nbsp;Mountains, <span style="color:#860008">-12</span>%&nbsp;in&nbsp;Forests)</b></div>';
    g_Effects['41'] = '<div style="text-align:left"><b>(<span style="color:#860008">-12</span>%&nbsp;on&nbsp;Hills, <span style="color:#004B00">+12</span>%&nbsp;on&nbsp;Plains, <span style="color:#004B00">+4</span>%&nbsp;on&nbsp;Mountains, <span style="color:#860008">-12</span>%&nbsp;in&nbsp;Forests)</b></div>';
    g_Effects['42'] = '<div style="text-align:left"><b>(<span style="color:#860008">-8</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-8</span>%&nbsp;Spear&nbsp;Def, <span style="color:#004B00">+16</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-8</span>%&nbsp;Sword&nbsp;Def)</b></div>';
    g_Effects['43'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+6</span>%&nbsp;in&nbsp;Arctic, <span style="color:#860008">-4</span>%&nbsp;in&nbsp;Desert, <span style="color:#860008">-4</span>%&nbsp;in&nbsp;Jungle)</b></div>';
    g_Effects['44'] = '<div style="text-align:left"><b>(<span style="color:#860008">-6</span>%&nbsp;Attack, <span style="color:#860008">-7</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-7</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-7</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-7</span>%&nbsp;Sword&nbsp;Def, <span style="color:#004B00">+15</span>%&nbsp;Move&nbsp;Speed, <span style="color:#004B00">+8</span>%&nbsp;on&nbsp;Mountains, <span style="color:#004B00">+10</span>%&nbsp;in&nbsp;Forests, <span style="color:#860008">-4</span>%&nbsp;for&nbsp;Dwarves, <span style="color:#004B00">+2</span>%&nbsp;for&nbsp;Orcs)</b></div>';
    g_Effects['45'] = '<div style="text-align:left"><b>(<span style="color:#860008">-4</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-4</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-4</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-4</span>%&nbsp;Sword&nbsp;Def, <span style="color:#860008">-4</span>%&nbsp;on&nbsp;Hills, <span style="color:#860008">-2</span>%&nbsp;on&nbsp;Plains, <span style="color:#860008">-4</span>%&nbsp;in&nbsp;Forests, <span style="color:#004B00">+6</span>%&nbsp;for&nbsp;Dwarves)</b></div>';
    g_Effects['46'] = '<div style="text-align:left"><b>(<span style="color:#860008">-2</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-2</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-2</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-2</span>%&nbsp;Sword&nbsp;Def, <span style="color:#004B00">+24</span>%&nbsp;vs&nbsp;Undead)</b></div>';
    g_Effects['47'] = '<div style="text-align:left"><b>(<span style="color:#860008">-2</span>%&nbsp;Attack, <span style="color:#860008">-4</span>%&nbsp;on&nbsp;Hills, <span style="color:#860008">-2</span>%&nbsp;on&nbsp;Plains, <span style="color:#860008">-2</span>%&nbsp;on&nbsp;Mountains, <span style="color:#004B00">+6</span>%&nbsp;for&nbsp;Elves)</b></div>';
    g_Effects['48'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+4</span>%&nbsp;Attack, <span style="color:#860008">-6</span>%&nbsp;Cav&nbsp;Def, <span style="color:#004B00">+18</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-6</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-24</span>%&nbsp;Sword&nbsp;Def)</b></div>';
    g_Effects['50'] = '<div style="text-align:left"><b>(<span style="color:#860008">-8</span>%&nbsp;Attack, <span style="color:#004B00">+10</span>%&nbsp;Move&nbsp;Speed)</b></div>';
    g_Effects['51'] = '<div style="text-align:left"><b>(<span style="color:#860008">-8</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-8</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-8</span>%&nbsp;Bow&nbsp;Def, <span style="color:#004B00">+16</span>%&nbsp;Sword&nbsp;Def)</b></div>';
    g_Effects['52'] = '<div style="text-align:left"><b>(<span style="color:#860008">-4</span>%&nbsp;in&nbsp;Arctic, <span style="color:#860008">-4</span>%&nbsp;in&nbsp;Desert, <span style="color:#004B00">+6</span>%&nbsp;in&nbsp;Jungle)</b></div>';
    g_Effects['53'] = '<div style="text-align:left"><b>(<span style="color:#860008">-12</span>%&nbsp;on&nbsp;Hills, <span style="color:#860008">-12</span>%&nbsp;on&nbsp;Plains, <span style="color:#004B00">+12</span>%&nbsp;on&nbsp;Mountains, <span style="color:#004B00">+4</span>%&nbsp;in&nbsp;Forests)</b></div>';
    g_Effects['54'] = '<div style="text-align:left"><b>(<span style="color:#860008">-4</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-4</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-4</span>%&nbsp;Sword&nbsp;Def, <span style="color:#004B00">+25</span>%&nbsp;Magic&nbsp;Res, <span style="color:#004B00">+10</span>%&nbsp;vs&nbsp;Undead)</b></div>';
    g_Effects['55'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+16</span>%&nbsp;Attack, <span style="color:#860008">-20</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-12</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-14</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-4</span>%&nbsp;Sword&nbsp;Def, <span style="color:#860008">-5</span>%&nbsp;Move&nbsp;Speed, <span style="color:#860008">-12</span>%&nbsp;for&nbsp;Dwarves, <span style="color:#860008">-16</span>%&nbsp;for&nbsp;Elves, <span style="color:#860008">-12</span>%&nbsp;for&nbsp;Humans, <span style="color:#004B00">+12</span>%&nbsp;for&nbsp;Orcs)</b></div>';
    g_Effects['56'] = '<div style="text-align:left"><b>(<span style="color:#860008">-2</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-2</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-2</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-2</span>%&nbsp;Sword&nbsp;Def, <span style="color:#860008">-4</span>%&nbsp;on&nbsp;Plains, <span style="color:#860008">-2</span>%&nbsp;on&nbsp;Mountains, <span style="color:#860008">-2</span>%&nbsp;in&nbsp;Forests, <span style="color:#004B00">+6</span>%&nbsp;for&nbsp;Orcs)</b></div>';
    g_Effects['57'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+2</span>%&nbsp;Attack, <span style="color:#004B00">+2</span>%&nbsp;Cav&nbsp;Def, <span style="color:#004B00">+2</span>%&nbsp;Spear&nbsp;Def, <span style="color:#004B00">+2</span>%&nbsp;Bow&nbsp;Def, <span style="color:#004B00">+2</span>%&nbsp;Sword&nbsp;Def)</b></div>';
    g_Effects['58'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+2</span>%&nbsp;Attack, <span style="color:#860008">-4</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-4</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-4</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-4</span>%&nbsp;Sword&nbsp;Def, <span style="color:#004B00">+28</span>%&nbsp;vs&nbsp;Monsterous)</b></div>';
    g_Effects['59'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+16</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-8</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-8</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-8</span>%&nbsp;Sword&nbsp;Def)</b></div>';
    g_Effects['60'] = '<div style="text-align:left"><b>(<span style="color:#860008">-4</span>%&nbsp;in&nbsp;Arctic, <span style="color:#004B00">+6</span>%&nbsp;in&nbsp;Desert, <span style="color:#860008">-4</span>%&nbsp;in&nbsp;Jungle)</b></div>';
    g_Effects['61'] = '<div style="text-align:left"><b>(<span style="color:#860008">-8</span>%&nbsp;Cav&nbsp;Def, <span style="color:#004B00">+16</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-8</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-8</span>%&nbsp;Sword&nbsp;Def)</b></div>';
    g_Effects['62'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+4</span>%&nbsp;on&nbsp;Hills, <span style="color:#860008">-12</span>%&nbsp;on&nbsp;Plains, <span style="color:#860008">-12</span>%&nbsp;on&nbsp;Mountains, <span style="color:#004B00">+12</span>%&nbsp;in&nbsp;Forests)</b></div>';
    g_Effects['63'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+30</span>%&nbsp;Attack, <span style="color:#004B00">+10</span>%&nbsp;Cav&nbsp;Def, <span style="color:#004B00">+5</span>%&nbsp;Spear&nbsp;Def, <span style="color:#004B00">+15</span>%&nbsp;Sword&nbsp;Def)</b></div>';
    g_Effects['64'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+8</span>%&nbsp;Attack, <span style="color:#860008">-8</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-8</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-8</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-8</span>%&nbsp;Sword&nbsp;Def)</b></div>';
    g_Effects['65'] = '<div style="text-align:left"><b>(<span style="color:#860008">-2</span>%&nbsp;Attack, <span style="color:#860008">-2</span>%&nbsp;on&nbsp;Hills, <span style="color:#860008">-4</span>%&nbsp;on&nbsp;Mountains, <span style="color:#860008">-2</span>%&nbsp;in&nbsp;Forests, <span style="color:#004B00">+6</span>%&nbsp;for&nbsp;Humans)</b></div>';
    g_Effects['49'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+6</span>%&nbsp;Attack, <span style="color:#860008">-4</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-4</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-4</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-4</span>%&nbsp;Sword&nbsp;Def, <span style="color:#860008">-5</span>%&nbsp;Move&nbsp;Speed, <span style="color:#004B00">+6</span>%&nbsp;for&nbsp;Dwarves, <span style="color:#860008">-4</span>%&nbsp;for&nbsp;Elves, <span style="color:#860008">-2</span>%&nbsp;for&nbsp;Humans, <span style="color:#004B00">+2</span>%&nbsp;for&nbsp;Orcs)</b></div>';

    g_Effects['67'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+6</span>%&nbsp;in&nbsp;Arctic, <span style="color:#860008">-4</span>%&nbsp;in&nbsp;Desert, <span style="color:#860008">-4</span>%&nbsp;in&nbsp;Jungle)</b></div>';
    g_Effects['68'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+8</span>%&nbsp;Cav&nbsp;Def, <span style="color:#004B00">+8</span>%&nbsp;Spear&nbsp;Def, <span style="color:#004B00">+8</span>%&nbsp;Bow&nbsp;Def, <span style="color:#004B00">+8</span>%&nbsp;Sword&nbsp;Def, <span style="color:#860008">-16</span>%&nbsp;in&nbsp;Arctic, <span style="color:#860008">-16</span>%&nbsp;in&nbsp;Desert, <span style="color:#860008">-16</span>%&nbsp;in&nbsp;Jungle)</b></div>';
    g_Effects['76'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+15</span>%&nbsp;Attack, <span style="color:#860008">-5</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-5</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-5</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-5</span>%&nbsp;Sword&nbsp;Def, <span style="color:#860008">-10</span>%&nbsp;Move&nbsp;Speed, <span style="color:#860008">-16</span>%&nbsp;in&nbsp;Arctic, <span style="color:#860008">-16</span>%&nbsp;in&nbsp;Desert, <span style="color:#860008">-16</span>%&nbsp;in&nbsp;Jungle)</b></div>';
    g_Effects['69'] = '<div style="text-align:left"><b>(<span style="color:#860008">-4</span>%&nbsp;in&nbsp;Arctic, <span style="color:#004B00">+6</span>%&nbsp;in&nbsp;Desert, <span style="color:#860008">-4</span>%&nbsp;in&nbsp;Jungle)</b></div>';
    g_Effects['70'] = '<div style="text-align:left"><b>(<span style="color:#860008">-4</span>%&nbsp;Attack, <span style="color:#860008">-2</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-2</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-2</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-2</span>%&nbsp;Sword&nbsp;Def, <span style="color:#004B00">+6</span>%&nbsp;at&nbsp;Night, <span style="color:#860008">-8</span>%&nbsp;in Day, <span style="color:#860008">-6</span>%&nbsp;vs&nbsp;Monsterous, <span style="color:#004B00">+18</span>%&nbsp;vs&nbsp;Undead)</b></div>';
    g_Effects['71'] = '<div style="text-align:left"><b>(<span style="color:#860008">-12</span>%&nbsp;Attack, <span style="color:#860008">-6</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-6</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-6</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-6</span>%&nbsp;Sword&nbsp;Def, <span style="color:#004B00">+5</span>%&nbsp;Move&nbsp;Speed, <span style="color:#860008">-18</span>%&nbsp;in&nbsp;Arctic, <span style="color:#860008">-18</span>%&nbsp;in&nbsp;Desert, <span style="color:#860008">-18</span>%&nbsp;in&nbsp;Jungle, <span style="color:#004B00">+6</span>%&nbsp;in Day, <span style="color:#004B00">+24</span>%&nbsp;for&nbsp;Elves)</b></div>';
    g_Effects['72'] = '<div style="text-align:left"><b>(<span style="color:#860008">-2</span>%&nbsp;Attack, <span style="color:#860008">-2</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-2</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-2</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-2</span>%&nbsp;Sword&nbsp;Def, <span style="color:#860008">-5</span>%&nbsp;Move&nbsp;Speed, <span style="color:#004B00">+27</span>%&nbsp;vs&nbsp;Monsterous)</b></div>';
    g_Effects['73'] = '<div style="text-align:left"><b>(<span style="color:#860008">-8</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-8</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-8</span>%&nbsp;Bow&nbsp;Def, <span style="color:#004B00">+16</span>%&nbsp;Sword&nbsp;Def)</b></div>';
    g_Effects['74'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+12</span>%&nbsp;on&nbsp;Hills, <span style="color:#004B00">+4</span>%&nbsp;on&nbsp;Plains, <span style="color:#860008">-12</span>%&nbsp;on&nbsp;Mountains, <span style="color:#860008">-12</span>%&nbsp;in&nbsp;Forests)</b></div>';
    g_Effects['75'] = '<div style="text-align:left"><b>(<span style="color:#860008">-2</span>%&nbsp;Attack, <span style="color:#860008">-2</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-2</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-2</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-2</span>%&nbsp;Sword&nbsp;Def, <span style="color:#004B00">+24</span>%&nbsp;vs&nbsp;Animals)</b></div>';
    g_Effects['77'] = '<div style="text-align:left"><b>(<span style="color:#860008">-4</span>%&nbsp;in&nbsp;Arctic, <span style="color:#860008">-4</span>%&nbsp;in&nbsp;Desert, <span style="color:#004B00">+6</span>%&nbsp;in&nbsp;Jungle)</b></div>';
    g_Effects['78'] = '<div style="text-align:left"><b>(<span style="color:#860008">-4</span>%&nbsp;Attack, <span style="color:#004B00">+5</span>%&nbsp;Move&nbsp;Speed, <span style="color:#860008">-4</span>%&nbsp;in&nbsp;Arctic, <span style="color:#860008">-4</span>%&nbsp;in&nbsp;Desert, <span style="color:#004B00">+6</span>%&nbsp;in&nbsp;Jungle)</b></div>';
    g_Effects['79'] = '<div style="text-align:left"><b>(<span style="color:#860008">-8</span>%&nbsp;Attack, <span style="color:#004B00">+10</span>%&nbsp;Move&nbsp;Speed, <span style="color:#004B00">+3</span>%&nbsp;for&nbsp;Elves)</b></div>';
    g_Effects['80'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+16</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-8</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-8</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-8</span>%&nbsp;Sword&nbsp;Def)</b></div>';
    g_Effects['81'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+6</span>%&nbsp;Attack, <span style="color:#860008">-5</span>%&nbsp;Move&nbsp;Speed, <span style="color:#004B00">+6</span>%&nbsp;in&nbsp;Arctic, <span style="color:#860008">-4</span>%&nbsp;in&nbsp;Desert, <span style="color:#860008">-4</span>%&nbsp;in&nbsp;Jungle)</b></div>';
    g_Effects['82'] = '<div style="text-align:left"><b>(<span style="color:#860008">-8</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-8</span>%&nbsp;Spear&nbsp;Def, <span style="color:#004B00">+16</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-8</span>%&nbsp;Sword&nbsp;Def)</b></div>';
    g_Effects['83'] = '<div style="text-align:left"><b>(<span style="color:#860008">-12</span>%&nbsp;on&nbsp;Hills, <span style="color:#860008">-12</span>%&nbsp;on&nbsp;Plains, <span style="color:#004B00">+12</span>%&nbsp;on&nbsp;Mountains, <span style="color:#004B00">+4</span>%&nbsp;in&nbsp;Forests)</b></div>';
    g_Effects['84'] = '<div style="text-align:left"><b>(<span style="color:#860008">-12</span>%&nbsp;on&nbsp;Hills, <span style="color:#004B00">+12</span>%&nbsp;on&nbsp;Plains, <span style="color:#004B00">+4</span>%&nbsp;on&nbsp;Mountains, <span style="color:#860008">-12</span>%&nbsp;in&nbsp;Forests)</b></div>';
    g_Effects['85'] = '<div style="text-align:left"><b>(<span style="color:#860008">-4</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-4</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-4</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-4</span>%&nbsp;Sword&nbsp;Def, <span style="color:#004B00">+5</span>%&nbsp;Move&nbsp;Speed, <span style="color:#004B00">+4</span>%&nbsp;on&nbsp;Hills, <span style="color:#860008">-6</span>%&nbsp;on&nbsp;Plains, <span style="color:#004B00">+4</span>%&nbsp;in&nbsp;Forests, <span style="color:#860008">-18</span>%&nbsp;vs&nbsp;Monsterous, <span style="color:#004B00">+20</span>%&nbsp;vs&nbsp;Animals)</b></div>';
    g_Effects['86'] = '<div style="text-align:left"><b>(<span style="color:#860008">-8</span>%&nbsp;Cav&nbsp;Def, <span style="color:#004B00">+16</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-8</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-8</span>%&nbsp;Sword&nbsp;Def)</b></div>';
    g_Effects['87'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+5</span>%&nbsp;Cav&nbsp;Def, <span style="color:#004B00">+5</span>%&nbsp;Spear&nbsp;Def, <span style="color:#004B00">+5</span>%&nbsp;Bow&nbsp;Def, <span style="color:#004B00">+5</span>%&nbsp;Sword&nbsp;Def, <span style="color:#860008">-16</span>%&nbsp;in&nbsp;Arctic, <span style="color:#860008">-16</span>%&nbsp;in&nbsp;Desert, <span style="color:#860008">-16</span>%&nbsp;in&nbsp;Jungle, <span style="color:#004B00">+3</span>%&nbsp;for&nbsp;Elves)</b></div>';
    g_Effects['88'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+6</span>%&nbsp;Attack, <span style="color:#860008">-15</span>%&nbsp;Move&nbsp;Speed)</b></div>';
    g_Effects['89'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+4</span>%&nbsp;on&nbsp;Hills, <span style="color:#860008">-12</span>%&nbsp;on&nbsp;Plains, <span style="color:#860008">-12</span>%&nbsp;on&nbsp;Mountains, <span style="color:#004B00">+12</span>%&nbsp;in&nbsp;Forests)</b></div>';

    g_Effects['120'] = '<div style="text-align:left"><b>(<span style="color:#860008">-2</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-2</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-2</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-2</span>%&nbsp;Sword&nbsp;Def, <span style="color:#004B00">+10</span>%&nbsp;Move&nbsp;Speed, <span style="color:#004B00">+3</span>%&nbsp;for&nbsp;Orcs, <span style="color:#004B00">+24</span>%&nbsp;vs&nbsp;Monsterous, <span style="color:#004B00">+24</span>%&nbsp;vs&nbsp;Animals, <span style="color:#004B00">+24</span>%&nbsp;vs&nbsp;Undead)</b></div>';
    g_Effects['121'] = '<div style="text-align:left"><b>(<span style="color:#860008">-6</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-6</span>%&nbsp;Spear&nbsp;Def, <span style="color:#004B00">+24</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-6</span>%&nbsp;Sword&nbsp;Def)</b></div>';
    g_Effects['122'] = '<div style="text-align:left"><b>(<span style="color:#860008">-4</span>%&nbsp;in&nbsp;Arctic, <span style="color:#004B00">+8</span>%&nbsp;in&nbsp;Desert, <span style="color:#860008">-4</span>%&nbsp;in&nbsp;Jungle)</b></div>';
    g_Effects['123'] = '<div style="text-align:left"><b>(<span style="color:#860008">-4</span>%&nbsp;Attack, <span style="color:#004B00">+20</span>%&nbsp;Cav&nbsp;Def, <span style="color:#004B00">+20</span>%&nbsp;Spear&nbsp;Def, <span style="color:#004B00">+20</span>%&nbsp;Bow&nbsp;Def, <span style="color:#004B00">+20</span>%&nbsp;Sword&nbsp;Def, <span style="color:#860008">-20</span>%&nbsp;Move&nbsp;Speed)</b></div>';
    g_Effects['124'] = '<div style="text-align:left"><b>(<span style="color:#860008">-5</span>%&nbsp;Attack, <span style="color:#860008">-5</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-5</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-5</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-5</span>%&nbsp;Sword&nbsp;Def, <span style="color:#004B00">+15</span>%&nbsp;Move&nbsp;Speed, <span style="color:#004B00">+1</span>%&nbsp;for&nbsp;Elves, <span style="color:#004B00">+3</span>%&nbsp;for&nbsp;Orcs)</b></div>';
    g_Effects['125'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+4</span>%&nbsp;on&nbsp;Hills, <span style="color:#860008">-12</span>%&nbsp;on&nbsp;Plains, <span style="color:#860008">-12</span>%&nbsp;on&nbsp;Mountains, <span style="color:#004B00">+12</span>%&nbsp;in&nbsp;Forests, <span style="color:#004B00">+8</span>%&nbsp;for&nbsp;Elves)</b></div>';
    g_Effects['126'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+8</span>%&nbsp;in&nbsp;Arctic, <span style="color:#860008">-12</span>%&nbsp;in&nbsp;Desert, <span style="color:#860008">-12</span>%&nbsp;in&nbsp;Jungle)</b></div>';
    g_Effects['127'] = '<div style="text-align:left"><b>(<span style="color:#860008">-6</span>%&nbsp;Cav&nbsp;Def, <span style="color:#004B00">+24</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-6</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-6</span>%&nbsp;Sword&nbsp;Def)</b></div>';
    g_Effects['128'] = '<div style="text-align:left"><b>(<span style="color:#860008">-2</span>%&nbsp;Attack, <span style="color:#004B00">+10</span>%&nbsp;Cav&nbsp;Def, <span style="color:#004B00">+10</span>%&nbsp;Spear&nbsp;Def, <span style="color:#004B00">+10</span>%&nbsp;Bow&nbsp;Def, <span style="color:#004B00">+10</span>%&nbsp;Sword&nbsp;Def, <span style="color:#860008">-10</span>%&nbsp;Move&nbsp;Speed)</b></div>';
    g_Effects['129'] = '<div style="text-align:left"><b>(<span style="color:#860008">-12</span>%&nbsp;on&nbsp;Hills, <span style="color:#860008">-12</span>%&nbsp;on&nbsp;Plains, <span style="color:#004B00">+12</span>%&nbsp;on&nbsp;Mountains, <span style="color:#004B00">+4</span>%&nbsp;in&nbsp;Forests, <span style="color:#004B00">+8</span>%&nbsp;for&nbsp;Orcs)</b></div>';
    g_Effects['130'] = '<div style="text-align:left"><b>(<span style="color:#860008">-4</span>%&nbsp;in&nbsp;Arctic, <span style="color:#860008">-4</span>%&nbsp;in&nbsp;Desert, <span style="color:#004B00">+8</span>%&nbsp;in&nbsp;Jungle)</b></div>';
    g_Effects['131'] = '<div style="text-align:left"><b>(<span style="color:#860008">-2</span>%&nbsp;Attack, <span style="color:#860008">-2</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-2</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-2</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-2</span>%&nbsp;Sword&nbsp;Def, <span style="color:#004B00">+10</span>%&nbsp;Move&nbsp;Speed, <span style="color:#004B00">+2</span>%&nbsp;for&nbsp;Elves, <span style="color:#004B00">+6</span>%&nbsp;for&nbsp;Orcs)</b></div>';
    g_Effects['132'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+2</span>%&nbsp;Attack, <span style="color:#860008">-2</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-2</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-2</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-2</span>%&nbsp;Sword&nbsp;Def, <span style="color:#004B00">+18</span>%&nbsp;at&nbsp;Night, <span style="color:#860008">-6</span>%&nbsp;in Day)</b></div>';
    g_Effects['133'] = '<div style="text-align:left"><b>(<span style="color:#860008">-8</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-8</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-8</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-8</span>%&nbsp;Sword&nbsp;Def, <span style="color:#860008">-5</span>%&nbsp;Move&nbsp;Speed, <span style="color:#004B00">+28</span>%&nbsp;vs&nbsp;Animals)</b></div>';
    g_Effects['134'] = '<div style="text-align:left"><b>(<span style="color:#860008">-12</span>%&nbsp;on&nbsp;Hills, <span style="color:#004B00">+12</span>%&nbsp;on&nbsp;Plains, <span style="color:#004B00">+4</span>%&nbsp;on&nbsp;Mountains, <span style="color:#860008">-12</span>%&nbsp;in&nbsp;Forests, <span style="color:#004B00">+8</span>%&nbsp;for&nbsp;Humans)</b></div>';
    g_Effects['135'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+24</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-6</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-6</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-6</span>%&nbsp;Sword&nbsp;Def)</b></div>';
    g_Effects['136'] = '<div style="text-align:left"><b>(<span style="color:#860008">-6</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-6</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-6</span>%&nbsp;Bow&nbsp;Def, <span style="color:#004B00">+24</span>%&nbsp;Sword&nbsp;Def)</b></div>';
    g_Effects['137'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+2</span>%&nbsp;Attack, <span style="color:#860008">-2</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-2</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-2</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-2</span>%&nbsp;Sword&nbsp;Def, <span style="color:#860008">-6</span>%&nbsp;at&nbsp;Night, <span style="color:#004B00">+18</span>%&nbsp;in Day)</b></div>';
    g_Effects['138'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+12</span>%&nbsp;on&nbsp;Hills, <span style="color:#004B00">+4</span>%&nbsp;on&nbsp;Plains, <span style="color:#860008">-12</span>%&nbsp;on&nbsp;Mountains, <span style="color:#860008">-12</span>%&nbsp;in&nbsp;Forests, <span style="color:#004B00">+8</span>%&nbsp;for&nbsp;Dwarves)</b></div>';
    g_Effects['139'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+20</span>%&nbsp;Attack, <span style="color:#860008">-6</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-6</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-6</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-6</span>%&nbsp;Sword&nbsp;Def, <span style="color:#860008">-5</span>%&nbsp;Move&nbsp;Speed)</b></div>';

    g_Effects['141'] = '<div style="text-align:left"><b>(<span style="color:#860008">-4</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-4</span>%&nbsp;Spear&nbsp;Def, <span style="color:#004B00">+16</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-4</span>%&nbsp;Sword&nbsp;Def)</b></div>';
    g_Effects['142'] = '<div style="text-align:left"><b>(<span style="color:#860008">-4</span>%&nbsp;in&nbsp;Arctic, <span style="color:#004B00">+6</span>%&nbsp;in&nbsp;Desert, <span style="color:#860008">-4</span>%&nbsp;in&nbsp;Jungle)</b></div>';
    g_Effects['143'] = '<div style="text-align:left"><b>(<span style="color:#860008">-4</span>%&nbsp;Cav&nbsp;Def, <span style="color:#004B00">+16</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-4</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-4</span>%&nbsp;Sword&nbsp;Def)</b></div>';
    g_Effects['144'] = '<div style="text-align:left"><b>(<span style="color:#860008">-2</span>%&nbsp;Attack, <span style="color:#004B00">+6</span>%&nbsp;Cav&nbsp;Def, <span style="color:#004B00">+6</span>%&nbsp;Spear&nbsp;Def, <span style="color:#004B00">+6</span>%&nbsp;Bow&nbsp;Def, <span style="color:#004B00">+6</span>%&nbsp;Sword&nbsp;Def, <span style="color:#860008">-20</span>%&nbsp;Move&nbsp;Speed, <span style="color:#860008">-4</span>%&nbsp;in&nbsp;Arctic, <span style="color:#860008">-4</span>%&nbsp;in&nbsp;Desert, <span style="color:#860008">-4</span>%&nbsp;in&nbsp;Jungle)</b></div>';
    g_Effects['145'] = '<div style="text-align:left"><b>(<span style="color:#860008">-5</span>%&nbsp;Attack, <span style="color:#860008">-5</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-5</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-5</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-5</span>%&nbsp;Sword&nbsp;Def, <span style="color:#004B00">+15</span>%&nbsp;Move&nbsp;Speed, <span style="color:#004B00">+5</span>%&nbsp;in&nbsp;Desert, <span style="color:#004B00">+5</span>%&nbsp;in&nbsp;Jungle)</b></div>';
    g_Effects['146'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+6</span>%&nbsp;in&nbsp;Arctic, <span style="color:#860008">-12</span>%&nbsp;in&nbsp;Desert, <span style="color:#860008">-12</span>%&nbsp;in&nbsp;Jungle)</b></div>';
    g_Effects['147'] = '<div style="text-align:left"><b>(<span style="color:#860008">-2</span>%&nbsp;Attack, <span style="color:#004B00">+4</span>%&nbsp;Cav&nbsp;Def, <span style="color:#004B00">+4</span>%&nbsp;Spear&nbsp;Def, <span style="color:#004B00">+4</span>%&nbsp;Bow&nbsp;Def, <span style="color:#004B00">+4</span>%&nbsp;Sword&nbsp;Def, <span style="color:#860008">-10</span>%&nbsp;Move&nbsp;Speed, <span style="color:#860008">-4</span>%&nbsp;in&nbsp;Arctic, <span style="color:#860008">-4</span>%&nbsp;in&nbsp;Desert, <span style="color:#860008">-4</span>%&nbsp;in&nbsp;Jungle)</b></div>';
    g_Effects['148'] = '<div style="text-align:left"><b>(<span style="color:#860008">-12</span>%&nbsp;on&nbsp;Hills, <span style="color:#860008">-12</span>%&nbsp;on&nbsp;Plains, <span style="color:#004B00">+12</span>%&nbsp;on&nbsp;Mountains, <span style="color:#004B00">+4</span>%&nbsp;in&nbsp;Forests)</b></div>';
    g_Effects['149'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+12</span>%&nbsp;on&nbsp;Hills, <span style="color:#004B00">+4</span>%&nbsp;on&nbsp;Plains, <span style="color:#860008">-12</span>%&nbsp;on&nbsp;Mountains, <span style="color:#860008">-12</span>%&nbsp;in&nbsp;Forests)</b></div>';
    g_Effects['150'] = '<div style="text-align:left"><b>(<span style="color:#860008">-4</span>%&nbsp;in&nbsp;Arctic, <span style="color:#860008">-4</span>%&nbsp;in&nbsp;Desert, <span style="color:#004B00">+6</span>%&nbsp;in&nbsp;Jungle)</b></div>';
    g_Effects['151'] = '<div style="text-align:left"><b>(<span style="color:#860008">-2</span>%&nbsp;Attack, <span style="color:#860008">-2</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-2</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-2</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-2</span>%&nbsp;Sword&nbsp;Def, <span style="color:#004B00">+10</span>%&nbsp;Move&nbsp;Speed, <span style="color:#004B00">+1</span>%&nbsp;in&nbsp;Desert, <span style="color:#004B00">+1</span>%&nbsp;in&nbsp;Jungle)</b></div>';
    g_Effects['152'] = '<div style="text-align:left"><b>(<span style="color:#860008">-5</span>%&nbsp;Attack, <span style="color:#004B00">+5</span>%&nbsp;Cav&nbsp;Def, <span style="color:#004B00">+5</span>%&nbsp;Spear&nbsp;Def, <span style="color:#004B00">+5</span>%&nbsp;Bow&nbsp;Def, <span style="color:#004B00">+5</span>%&nbsp;Sword&nbsp;Def, <span style="color:#860008">-5</span>%&nbsp;Move&nbsp;Speed, <span style="color:#004B00">+10</span>%&nbsp;for&nbsp;Humans)</b></div>';
    g_Effects['153'] = '<div style="text-align:left"><b>(<span style="color:#860008">-5</span>%&nbsp;Move&nbsp;Speed, <span style="color:#004B00">+10</span>%&nbsp;vs&nbsp;Animals)</b></div>';
    g_Effects['154'] = '<div style="text-align:left"><b>(<span style="color:#860008">-12</span>%&nbsp;on&nbsp;Hills, <span style="color:#004B00">+12</span>%&nbsp;on&nbsp;Plains, <span style="color:#004B00">+4</span>%&nbsp;on&nbsp;Mountains, <span style="color:#860008">-12</span>%&nbsp;in&nbsp;Forests)</b></div>';
    g_Effects['155'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+16</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-4</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-4</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-4</span>%&nbsp;Sword&nbsp;Def)</b></div>';
    g_Effects['156'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+8</span>%&nbsp;Attack, <span style="color:#004B00">+15</span>%&nbsp;Cav&nbsp;Def, <span style="color:#004B00">+15</span>%&nbsp;Spear&nbsp;Def, <span style="color:#004B00">+15</span>%&nbsp;Bow&nbsp;Def, <span style="color:#004B00">+15</span>%&nbsp;Sword&nbsp;Def)</b></div>';
    g_Effects['157'] = '<div style="text-align:left"><b>(<span style="color:#860008">-4</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-4</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-4</span>%&nbsp;Bow&nbsp;Def, <span style="color:#004B00">+16</span>%&nbsp;Sword&nbsp;Def)</b></div>';
    g_Effects['158'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+5</span>%&nbsp;Attack, <span style="color:#860008">-4</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-4</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-4</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-4</span>%&nbsp;Sword&nbsp;Def)</b></div>';
    g_Effects['159'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+4</span>%&nbsp;on&nbsp;Hills, <span style="color:#860008">-12</span>%&nbsp;on&nbsp;Plains, <span style="color:#860008">-12</span>%&nbsp;on&nbsp;Mountains, <span style="color:#004B00">+12</span>%&nbsp;in&nbsp;Forests)</b></div>';

    g_Effects['161'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+10</span>%&nbsp;Cav&nbsp;Def, <span style="color:#004B00">+10</span>%&nbsp;Spear&nbsp;Def, <span style="color:#004B00">+10</span>%&nbsp;Bow&nbsp;Def, <span style="color:#004B00">+5</span>%&nbsp;Sword&nbsp;Def, <span style="color:#004B00">+5</span>%&nbsp;Move&nbsp;Speed, <span style="color:#860008">-8</span>%&nbsp;in&nbsp;Arctic, <span style="color:#860008">-8</span>%&nbsp;in&nbsp;Desert, <span style="color:#860008">-8</span>%&nbsp;in&nbsp;Jungle)</b></div>';
    g_Effects['162'] = '<div style="text-align:left"><b>(<span style="color:#860008">-4</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-4</span>%&nbsp;Spear&nbsp;Def, <span style="color:#004B00">+16</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-4</span>%&nbsp;Sword&nbsp;Def)</b></div>';
    g_Effects['163'] = '<div style="text-align:left"><b>(<span style="color:#860008">-6</span>%&nbsp;in&nbsp;Arctic, <span style="color:#004B00">+6</span>%&nbsp;in&nbsp;Desert, <span style="color:#860008">-6</span>%&nbsp;in&nbsp;Jungle)</b></div>';
    g_Effects['164'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+4</span>%&nbsp;Attack, <span style="color:#004B00">+10</span>%&nbsp;Cav&nbsp;Def, <span style="color:#004B00">+14</span>%&nbsp;Spear&nbsp;Def, <span style="color:#004B00">+14</span>%&nbsp;Bow&nbsp;Def, <span style="color:#004B00">+10</span>%&nbsp;Sword&nbsp;Def, <span style="color:#860008">-25</span>%&nbsp;Move&nbsp;Speed, <span style="color:#004B00">+6</span>%&nbsp;on&nbsp;Hills, <span style="color:#004B00">+2</span>%&nbsp;on&nbsp;Mountains, <span style="color:#860008">-10</span>%&nbsp;in&nbsp;Arctic, <span style="color:#860008">-10</span>%&nbsp;in&nbsp;Desert, <span style="color:#860008">-10</span>%&nbsp;in&nbsp;Jungle, <span style="color:#004B00">+8</span>%&nbsp;for&nbsp;Dwarves, <span style="color:#860008">-12</span>%&nbsp;for&nbsp;Elves, <span style="color:#860008">-12</span>%&nbsp;for&nbsp;Humans, <span style="color:#860008">-12</span>%&nbsp;for&nbsp;Orcs)</b></div>';
    g_Effects['165'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+4</span>%&nbsp;on&nbsp;Hills, <span style="color:#860008">-12</span>%&nbsp;on&nbsp;Plains, <span style="color:#860008">-12</span>%&nbsp;on&nbsp;Mountains, <span style="color:#004B00">+12</span>%&nbsp;in&nbsp;Forests)</b></div>';
    g_Effects['166'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+6</span>%&nbsp;in&nbsp;Arctic, <span style="color:#860008">-18</span>%&nbsp;in&nbsp;Desert, <span style="color:#860008">-18</span>%&nbsp;in&nbsp;Jungle)</b></div>';
    g_Effects['167'] = '<div style="text-align:left"><b>(<span style="color:#860008">-2</span>%&nbsp;Attack, <span style="color:#004B00">+4</span>%&nbsp;Cav&nbsp;Def, <span style="color:#004B00">+4</span>%&nbsp;Spear&nbsp;Def, <span style="color:#004B00">+4</span>%&nbsp;Bow&nbsp;Def, <span style="color:#004B00">+4</span>%&nbsp;Sword&nbsp;Def, <span style="color:#860008">-20</span>%&nbsp;Move&nbsp;Speed, <span style="color:#860008">-5</span>%&nbsp;in&nbsp;Arctic, <span style="color:#860008">-5</span>%&nbsp;in&nbsp;Desert, <span style="color:#860008">-5</span>%&nbsp;in&nbsp;Jungle)</b></div>';
    g_Effects['168'] = '<div style="text-align:left"><b>(<span style="color:#860008">-12</span>%&nbsp;on&nbsp;Hills, <span style="color:#860008">-12</span>%&nbsp;on&nbsp;Plains, <span style="color:#004B00">+12</span>%&nbsp;on&nbsp;Mountains, <span style="color:#004B00">+4</span>%&nbsp;in&nbsp;Forests)</b></div>';
    g_Effects['169'] = '<div style="text-align:left"><b>(<span style="color:#860008">-6</span>%&nbsp;in&nbsp;Arctic, <span style="color:#860008">-6</span>%&nbsp;in&nbsp;Desert, <span style="color:#004B00">+6</span>%&nbsp;in&nbsp;Jungle)</b></div>';
    g_Effects['170'] = '<div style="text-align:left"><b>(<span style="color:#860008">-2</span>%&nbsp;Attack, <span style="color:#860008">-2</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-2</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-2</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-2</span>%&nbsp;Sword&nbsp;Def, <span style="color:#004B00">+10</span>%&nbsp;Move&nbsp;Speed)</b></div>';
    g_Effects['171'] = '<div style="text-align:left"><b>(<span style="color:#860008">-2</span>%&nbsp;Attack, <span style="color:#860008">-2</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-2</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-2</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-3</span>%&nbsp;Sword&nbsp;Def, <span style="color:#860008">-5</span>%&nbsp;Move&nbsp;Speed, <span style="color:#004B00">+40</span>%&nbsp;Magic&nbsp;Res, <span style="color:#004B00">+7</span>%&nbsp;vs&nbsp;Undead)</b></div>';
    g_Effects['172'] = '<div style="text-align:left"><b>(<span style="color:#860008">-12</span>%&nbsp;on&nbsp;Hills, <span style="color:#004B00">+12</span>%&nbsp;on&nbsp;Plains, <span style="color:#004B00">+4</span>%&nbsp;on&nbsp;Mountains, <span style="color:#860008">-12</span>%&nbsp;in&nbsp;Forests)</b></div>';
    g_Effects['173'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+16</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-4</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-4</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-4</span>%&nbsp;Sword&nbsp;Def)</b></div>';
    g_Effects['174'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+8</span>%&nbsp;Attack, <span style="color:#004B00">+15</span>%&nbsp;Cav&nbsp;Def, <span style="color:#004B00">+15</span>%&nbsp;Spear&nbsp;Def, <span style="color:#004B00">+15</span>%&nbsp;Bow&nbsp;Def, <span style="color:#004B00">+15</span>%&nbsp;Sword&nbsp;Def)</b></div>';
    g_Effects['175'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+2</span>%&nbsp;Attack, <span style="color:#860008">-2</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-2</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-2</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-2</span>%&nbsp;Sword&nbsp;Def, <span style="color:#004B00">+18</span>%&nbsp;vs&nbsp;Monsterous, <span style="color:#004B00">+10</span>%&nbsp;vs&nbsp;Animals)</b></div>';
    g_Effects['176'] = '<div style="text-align:left"><b>(<span style="color:#860008">-4</span>%&nbsp;Cav&nbsp;Def, <span style="color:#004B00">+16</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-4</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-4</span>%&nbsp;Sword&nbsp;Def)</b></div>';
    g_Effects['177'] = '<div style="text-align:left"><b>(<span style="color:#860008">-4</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-4</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-4</span>%&nbsp;Bow&nbsp;Def, <span style="color:#004B00">+16</span>%&nbsp;Sword&nbsp;Def)</b></div>';
    g_Effects['178'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+12</span>%&nbsp;on&nbsp;Hills, <span style="color:#004B00">+4</span>%&nbsp;on&nbsp;Plains, <span style="color:#860008">-12</span>%&nbsp;on&nbsp;Mountains, <span style="color:#860008">-12</span>%&nbsp;in&nbsp;Forests)</b></div>';
    g_Effects['179'] = '<div style="text-align:left"><b>(<span style="color:#004B00">+5</span>%&nbsp;Attack, <span style="color:#860008">-4</span>%&nbsp;Cav&nbsp;Def, <span style="color:#860008">-4</span>%&nbsp;Spear&nbsp;Def, <span style="color:#860008">-4</span>%&nbsp;Bow&nbsp;Def, <span style="color:#860008">-4</span>%&nbsp;Sword&nbsp;Def)</b></div>';


    // span data
    var g_Span = {};

    // minerals
    g_Span['193'] = '<span class="itemsprite arterium_24" title="Arterium"></span>';
    g_Span['194'] = '<span class="itemsprite earthblood_24" title="Earthblood"></span>';
    g_Span['195'] = '<span class="itemsprite deepsilver_24" title="Deepsilver"></span>';
    g_Span['196'] = '<span class="itemsprite pyrestone_24" title="Pyrestone"></span>';
    g_Span['197'] = '<span class="itemsprite trove_24" title="Trove"></span>';
    g_Span['198'] = '<span class="itemsprite rainbowstone_24" title="Rainbowstone"></span>';
    g_Span['199'] = '<span class="itemsprite claristrine_24" title="Claristrine"></span>';
    g_Span['200'] = '<span class="itemsprite elventears_24" title="Elven Tears"></span>';
    g_Span['201'] = '<span class="itemsprite svelaughsand_24" title="Svelaugh Sand"></span>';
    g_Span['202'] = '<span class="itemsprite aeghris_24" title="Aeghris"></span>';
    g_Span['203'] = '<span class="itemsprite daera_24" title="Daera"></span>';
    g_Span['204'] = '<span class="itemsprite flektrine_24" title="Flektrine"></span>';
    g_Span['205'] = '<span class="itemsprite almhurin_24" title="Almhurin"></span>';
    g_Span['206'] = '<span class="itemsprite silversoil_24" title="Silversoil"></span>';
    g_Span['207'] = '<span class="itemsprite obsidian_24" title="Obsidian"></span>';
    g_Span['208'] = '<span class="itemsprite goldstone_24" title="Goldstone"></span>';
    g_Span['209'] = '<span class="itemsprite nightdiamond_24" title="Night Diamond"></span>';
    g_Span['210'] = '<span class="itemsprite iceheart_24" title="Iceheart"></span>';
    g_Span['211'] = '<span class="itemsprite amarshards_24" title="Amar Shards"></span>';
    g_Span['212'] = '<span class="itemsprite silversteel_24" title="Silversteel"></span>';

    // herbs
    g_Span['246'] = '<span class="itemsprite ancientoak_24" title="Ancient Oak"></span>';
    g_Span['231'] = '<span class="itemsprite baleberries_24" title="Baleberries"></span>';
    g_Span['227'] = '<span class="itemsprite berbaneleaves_24" title="Berbane Leaves"></span>';
    g_Span['250'] = '<span class="itemsprite braslanseeds_24" title="Brascan Seeds"></span>';
    g_Span['243'] = '<span class="itemsprite brownbackmoss_24" title="Brownback Moss"></span>';
    g_Span['252'] = '<span class="itemsprite desertflame_24" title="Desert Flame"></span>';
    g_Span['233'] = '<span class="itemsprite dyallomgall_24" title="Dyallom Gall"></span>';
    g_Span['232'] = '<span class="itemsprite ebonywood_24" title="Ebony Wood"></span>';
    g_Span['239'] = '<span class="itemsprite furzionseed_24" title="Furzion Seedpod"></span>';
    g_Span['251'] = '<span class="itemsprite giantpalmleaves_24" title="Giant Palm Leaves"></span>';
    g_Span['235'] = '<span class="itemsprite ironstem_24" title="Ironstem Root"></span>';
    g_Span['226'] = '<span class="itemsprite larkenwood_24" title="Larken Wood"></span>';
    g_Span['225'] = '<span class="itemsprite lemonwoodbough_24" title="Lemonwood Bough"></span>';
    g_Span['229'] = '<span class="itemsprite mabrifruit_24" title="Mabri Fruit"></span>';
    g_Span['236'] = '<span class="itemsprite minersbane_24" title="Miner\'s Bane"></span>';
    g_Span['224'] = '<span class="itemsprite palecedarwood_24" title="Pale Cedar Wood"></span>';
    g_Span['230'] = '<span class="itemsprite punfruit_24" title="Punfruit"></span>';
    g_Span['248'] = '<span class="itemsprite queenshairleaves_24" title="Queen\'s Hair Leaves"></span>';
    g_Span['247'] = '<span class="itemsprite rahanpalmwood_24" title="Rahan Palm Wood"></span>';
    g_Span['241'] = '<span class="itemsprite rockweed_24" title="Rockweed Root"></span>';
    g_Span['245'] = '<span class="itemsprite sharproot_24" title="Sharproot"></span>';
    g_Span['244'] = '<span class="itemsprite silverthorn_24" title="Silverthorn"></span>';
    g_Span['237'] = '<span class="itemsprite snowbell_24" title="Snowbell Flowers"></span>';
    g_Span['249'] = '<span class="itemsprite spidertreeleaves_24" title="Spidertree Leaves"></span>';
    g_Span['242'] = '<span class="itemsprite suntreehaft_24" title="Suntree Haft"></span>';
    g_Span['238'] = '<span class="itemsprite toadcap_24" title="Toadcap Fungus"></span>';
    g_Span['240'] = '<span class="itemsprite vistrokflower_24" title="Vistrok Flower"></span>';
    g_Span['234'] = '<span class="itemsprite warpwoodshoot_24" title="Warpwood Shoot"></span>';
    g_Span['228'] = '<span class="itemsprite ysanberries_24" title="Ysanberries"></span>';

    // animal parts
    g_Span['298'] = '<span class="animsprite alliheart_24" title="Alligator Heart"></span>';
    g_Span['299'] = '<span class="animsprite alliskull_24" title="Alligator Skull"></span>';
    g_Span['300'] = '<span class="animsprite allientrails_24" title="Alligator Entrail"></span>';
    g_Span['301'] = '<span class="animsprite alliverte_24" title="Alligator Vertebra"></span>';
    g_Span['302'] = '<span class="animsprite anaheart_24" title="Anaconda Heart"></span>';
    g_Span['303'] = '<span class="animsprite anafangs_24" title="Anaconda Fang"></span>';
    g_Span['304'] = '<span class="animsprite anaskin_24" title="Anaconda Skin"></span>';
    g_Span['305'] = '<span class="animsprite arcwolfheart_24" title="Arctic Wolf Heart"></span>';
    g_Span['306'] = '<span class="animsprite arcwolfentrails_24" title="Arctic Wolf Entrail"></span>';
    g_Span['307'] = '<span class="animsprite arcwolffur_24" title="Arctic Wolf Fur"></span>';
    g_Span['308'] = '<span class="animsprite arcwolfteeth_24" title="Arctic Wolf Tooth"></span>';
    g_Span['309'] = '<span class="animsprite babheart_24" title="Baboon Heart"></span>';
    g_Span['310'] = '<span class="animsprite babentrails_24" title="Baboon Entrail"></span>';
    g_Span['311'] = '<span class="animsprite babfurs_24" title="Baboon Fur"></span>';
    g_Span['312'] = '<span class="animsprite blackbheart_24" title="Black Bear Heart"></span>';
    g_Span['313'] = '<span class="animsprite blackbteeth_24" title="Black Bear Tooth"></span>';
    g_Span['314'] = '<span class="animsprite blackbfur_24" title="Black Bear Fur"></span>';
    g_Span['315'] = '<span class="animsprite blackbverte_24" title="Black Bear Vertebra"></span>';
    g_Span['316'] = '<span class="animsprite blackpheart_24" title="Black Panther Heart"></span>';
    g_Span['317'] = '<span class="animsprite blackpverte_24" title="Black Panther Vertebra"></span>';
    g_Span['318'] = '<span class="animsprite blackpfur_24" title="Black Panther Fur"></span>';
    g_Span['319'] = '<span class="animsprite brownbheart_24" title="Brown Bear Heart"></span>';
    g_Span['320'] = '<span class="animsprite brownbfur_24" title="Brown Bear Fur"></span>';
    g_Span['321'] = '<span class="animsprite brownbverti_24" title="Brown Bear Vertebra"></span>';
    g_Span['322'] = '<span class="animsprite cobraheart_24" title="Cobra Heart"></span>';
    g_Span['323'] = '<span class="animsprite cobrabrains_24" title="Cobra Brain"></span>';
    g_Span['324'] = '<span class="animsprite coralheart_24" title="Coral Snake Heart"></span>';
    g_Span['325'] = '<span class="animsprite coralbrains_24" title="Coral Snake Brain"></span>';
    g_Span['326'] = '<span class="animsprite cyclopsheart_24" title="Cyclops Heart"></span>';
    g_Span['327'] = '<span class="animsprite cyclopsentrails_24" title="Cyclops Entrail"></span>';
    g_Span['328'] = '<span class="animsprite elephantheart_24" title="Elephant Heart"></span>';
    g_Span['329'] = '<span class="animsprite elephanthide_24" title="Elephant Hide"></span>';
    g_Span['330'] = '<span class="animsprite elephantribs_24" title="Elephant Rib"></span>';
    g_Span['331'] = '<span class="animsprite elephantverte_24" title="Elephant Vertebra"></span>';
    g_Span['332'] = '<span class="animsprite firesalheart_24" title="Fire Salamander Heart"></span>';
    g_Span['333'] = '<span class="animsprite firesalent_24" title="Fire Salamander Entrail"></span>';
    g_Span['334'] = '<span class="animsprite firesalskin_24" title="Fire Salamander Skin"></span>';
    g_Span['335'] = '<span class="animsprite gharheart_24" title="Gharial Heart"></span>';
    g_Span['336'] = '<span class="animsprite gharteeth_24" title="Gharial Tooth"></span>';
    g_Span['337'] = '<span class="animsprite giantcara_24" title="Giant Beetle Heart"></span>';
    g_Span['338'] = '<span class="animsprite giantbeetheart_24" title="Giant Beetle Carapace"></span>';
    g_Span['339'] = '<span class="animsprite giantratheart_24" title="Giant Rat Heart"></span>';
    g_Span['340'] = '<span class="animsprite giantratribs_24" title="Giant Rat Rib"></span>';
    g_Span['341'] = '<span class="animsprite giantratfur_24" title="Giant Rat Fur"></span>';
    g_Span['342'] = '<span class="animsprite giantscorpheart_24" title="Giant Scorpion Heart"></span>';
    g_Span['343'] = '<span class="animsprite giantscorpexo_24" title="Giant Scorpion Exoskeleton"></span>';
    g_Span['344'] = '<span class="animsprite giantscorpstinger_24" title="Giant Scorpion Stinger"></span>';
    g_Span['345'] = '<span class="animsprite giantscuttheart_24" title="Giant Scuttler Heart"></span>';
    g_Span['346'] = '<span class="animsprite giantscuttexo_24" title="Giant Scuttler Exoskeleton"></span>';
    g_Span['347'] = '<span class="animsprite giantsnakeheart_24" title="Giant Snake Heart"></span>';
    g_Span['348'] = '<span class="animsprite giantsnakeverte_24" title="Giant Snake Vertebra"></span>';
    g_Span['349'] = '<span class="animsprite giantsnakefangs_24" title="Giant Snake Fang"></span>';
    g_Span['350'] = '<span class="animsprite giantspiderheart_24" title="Giant Spider Heart"></span>';
    g_Span['351'] = '<span class="animsprite giantspiderfangs_24" title="Giant Spider Fangs"></span>';
    g_Span['352'] = '<span class="animsprite goldenmonkeyheart_24" title="Golden Monkey Heart"></span>';
    g_Span['353'] = '<span class="animsprite goldenmonkeyent_24" title="Golden Monkey Entrail"></span>';
    g_Span['354'] = '<span class="animsprite goldenmonkeyfur_24" title="Golden Monkey Fur"></span>';
    g_Span['355'] = '<span class="animsprite icesalheart_24" title="Ice Salamander Heart"></span>';
    g_Span['356'] = '<span class="animsprite icesalentrails_24" title="Ice Salamander Entrail"></span>';
    g_Span['357'] = '<span class="animsprite icesalskin_24" title="Ice Salamander Skin"></span>';
    g_Span['358'] = '<span class="animsprite jaguarheart_24" title="Jaguar Heart"></span>';
    g_Span['359'] = '<span class="animsprite jaguarfur_24" title="Jaguar Fur"></span>';
    g_Span['360'] = '<span class="animsprite jaguarverte_24" title="Jaguar Vertebra"></span>';
    g_Span['361'] = '<span class="animsprite leopardheart_24" title="Leopard Heart"></span>';
    g_Span['362'] = '<span class="animsprite babentrails_24" title="Leopard Entrail"></span>';
    g_Span['363'] = '<span class="animsprite leopardverte_24" title="Leopard Vertebra"></span>';
    g_Span['364'] = '<span class="animsprite lionheart_24" title="Lion Heart"></span>';
    g_Span['365'] = '<span class="animsprite lionskull_24" title="Lion Skull"></span>';
    g_Span['366'] = '<span class="animsprite lionteeth_24" title="Lion Tooth"></span>';
    g_Span['367'] = '<span class="animsprite lionverte_24" title="Lion Vertebra"></span>';
    g_Span['368'] = '<span class="animsprite mammothheart_24" title="Mammoth Heart"></span>';
    g_Span['369'] = '<span class="animsprite mammothribs_24" title="Mammoth Rib"></span>';
    g_Span['370'] = '<span class="animsprite mammothtusk_24" title="Mammoth Tusk"></span>';
    g_Span['371'] = '<span class="animsprite mammothverte_24" title="Mammoth Vertebra"></span>';
    g_Span['372'] = '<span class="animsprite scarabheart_24" title="Massive Scarab Heart"></span>';
    g_Span['373'] = '<span class="animsprite scarabcara_24" title="Massive Scarab Carapace"></span>';
    g_Span['374'] = '<span class="animsprite poisoncrawlerheart_24" title="Poisonous Crawler Heart"></span>';
    g_Span['375'] = '<span class="animsprite poisoncrawlerexo_24" title="Poisonous Crawler Exoskeleton"></span>';
    g_Span['376'] = '<span class="animsprite poisoncrawlermand_24" title="Poisonous Crawler Mandible"></span>';
    g_Span['377'] = '<span class="animsprite polarbearheart_24" title="Polar Bear Heart"></span>';
    g_Span['378'] = '<span class="animsprite polarbearfurs_24" title="Polar Bear Fur"></span>';
    g_Span['379'] = '<span class="animsprite pumaheart_24" title="Puma Heart"></span>';
    g_Span['380'] = '<span class="animsprite pumaribs_24" title="Puma Rib"></span>';
    g_Span['381'] = '<span class="animsprite pumaverte_24" title="Puma Vertebra"></span>';
    g_Span['382'] = '<span class="animsprite pumafur_24" title="Puma Fur"></span>';
    g_Span['383'] = '<span class="animsprite rhinoheart_24" title="Rhinoceros Heart"></span>';
    g_Span['384'] = '<span class="animsprite rhinoribs_24" title="Rhinoceros Rib"></span>';
    g_Span['385'] = '<span class="animsprite rhinohide_24" title="Rhinoceros Hide"></span>';
    g_Span['386'] = '<span class="animsprite salaheart_24" title="Salamander Heart"></span>';
    g_Span['387'] = '<span class="animsprite salaentrails_24" title="Salamander Entrail"></span>';
    g_Span['388'] = '<span class="animsprite salafangs_24" title="Salamander Fang"></span>';
    g_Span['389'] = '<span class="animsprite saurheart_24" title="Saurian Heart"></span>';
    g_Span['390'] = '<span class="animsprite saurentrails_24" title="Saurian Entrail"></span>';
    g_Span['391'] = '<span class="animsprite saurribs_24" title="Saurian Rib"></span>';
    g_Span['392'] = '<span class="animsprite saurverte_24" title="Saurian Vertebra"></span>';
    g_Span['393'] = '<span class="animsprite scaledcharheart_24" title="Scaled Charger Heart"></span>';
    g_Span['394'] = '<span class="animsprite scaledcharscale_24" title="Scaled Charger Scale"></span>';
    g_Span['395'] = '<span class="animsprite scaledcharverte_24" title="Scaled Charger Vertebra"></span>';
    g_Span['396'] = '<span class="animsprite scritcherheart_24" title="Scritcher Heart"></span>';
    g_Span['397'] = '<span class="animsprite scritchercara_24" title="Scritcher Carapace"></span>';
    g_Span['398'] = '<span class="animsprite simienwolfheart_24" title="Simien Wolf Heart"></span>';
    g_Span['399'] = '<span class="animsprite simienwolffur_24" title="Simien Wolf Fur"></span>';
    g_Span['400'] = '<span class="animsprite snleopardheart_24" title="Snow Leopard Heart"></span>';
    g_Span['401'] = '<span class="animsprite snleopardfur_24" title="Snow Leopard Fur"></span>';
    g_Span['402'] = '<span class="animsprite snleopardverte_24" title="Snow Leopard Vertebra"></span>';
    g_Span['403'] = '<span class="animsprite tigerheart_24" title="Tiger Heart"></span>';
    g_Span['404'] = '<span class="animsprite tigerteeth_24" title="Tiger Tooth"></span>';
    g_Span['405'] = '<span class="animsprite tigerskull_24" title="Tiger Skull"></span>';
    g_Span['406'] = '<span class="animsprite snowtigerheart_24" title="White Tiger Heart"></span>';
    g_Span['407'] = '<span class="animsprite snowtigerverte_24" title="White Tiger Vertebra"></span>';
    g_Span['408'] = '<span class="animsprite wilddogheart_24" title="Wild Dog Heart"></span>';
    g_Span['409'] = '<span class="animsprite wilddogbones_24" title="Wild Dog Bone"></span>';
    g_Span['410'] = '<span class="animsprite wilddogentrails_24" title="Wild Dog Entrail"></span>';
    g_Span['411'] = '<span class="animsprite wilddogfur_24" title="Wild Dog Fur"></span>';
    g_Span['412'] = '<span class="animsprite wolfheart_24" title="Wolf Heart"></span>';
    g_Span['413'] = '<span class="animsprite wolfentrails_24" title="Wolf Entrail"></span>';
    g_Span['414'] = '<span class="animsprite wolfteeth_24" title="Wolf Tooth"></span>';
    g_Span['415'] = '<span class="animsprite wolffur_24" title="Wolf Fur"></span>';

    // salts
    g_Span['290'] = '<span class="base elemairsalt_24" title="Air Salt"></span>';
    g_Span['291'] = '<span class="base elemearthsalt_24" title="Earth Salt"></span>';
    g_Span['292'] = '<span class="base elemfiresalt_24" title="Fire Salt"></span>';
    g_Span['293'] = '<span class="base elemwatersalt_24" title="Water Salt"></span>';

    // special
    g_Span['253'] = '<span class="base grapes_24" title="Grapes"></span>';
    g_Span['255'] = '<span class="base tentacle_24" title="Corrupted Human Tentacle"></span>';
    g_Span['256'] = '<span class="base tentacle_24" title="Corrupted Elf Tentacle"></span>';
    g_Span['257'] = '<span class="base tentacle_24" title="Corrupted Dwarf Tentacle"></span>';
    g_Span['258'] = '<span class="base tentacle_24" title="Corrupted Orc Tentacle"></span>';
    g_Span['186'] = '<span class="base pelts_24" title="Hides"></span>';
    g_Span['416'] = '<span class="itemsprite herbs_24" title="Herb"></span>';
    g_Span['417'] = '<span class="base crystals_24" title="Mineral"></span>';
    g_Span['420'] = '<span class="base wine_24" title="Wine"></span>';

    // discoveries
    g_Span['45'] = '<span class="itemsprite dwarvenaxe24" title="Dwarven Battle Axe"></span>';
    g_Span['47'] = '<span class="itemsprite elvishsword24" title="Elven Sword"></span>';
    g_Span['55'] = '<span class="itemsprite orcmarauder24" title="Orc Marauder\'s Sword"></span>';
    g_Span['56'] = '<span class="itemsprite orcishsword24" title="Orcish Sword"></span>';
    g_Span['65'] = '<span class="itemsprite traditionalsword24" title="Traditional Sword"></span>';
    g_Span['71'] = '<span class="itemsprite elvenspirit24" title="Elven Spirit Bow"></span>';
    g_Span['152'] = '<span class="itemsprite masterchain24" title="Master-Crafted Chainmail"></span>';
    g_Span['161'] = '<span class="itemsprite ancientpattern24" title="Ancient Pattern Armour"></span>';
    g_Span['164'] = '<span class="itemsprite dwarvenchamp24" title="Dwarven Champion\'s"></span>';
    g_Span['422'] = '<span class="itemsprite elvishhorse24" title="Elven Thoroughbred"></span>';
    g_Span['423'] = '<span class="itemsprite humanwarhorse24" title="Battlebred"></span>';
    g_Span['424'] = '<span class="itemsprite dwarvenwarmule24" title="Dwarven Battle Mule"></span>';
    g_Span['425'] = '<span class="itemsprite warwolf24" title="War Wolf"></span>';

    // horses
    g_Span['33'] = '<span class="itemsprite draughthorse24" title="Draught Horse"></span>';
    g_Span['36'] = '<span class="itemsprite ridinghorse24" title="Riding Horse"></span>';
    g_Span['34'] = '<span class="itemsprite heavyhorse24" title="Heavy Warhorse"></span>';
    g_Span['37'] = '<span class="itemsprite steadyhorse24" title="Steady Warhorse"></span>';
    g_Span['35'] = '<span class="itemsprite nimblehorse24" title="Nimble Warhorse"></span>';

    // spears
    g_Span['91'] = '<span class="itemsprite arcticspear24" title="Arctic Spear"></span>';
    g_Span['92'] = '<span class="itemsprite battlespear24" title="Battle Spear"></span>';
    g_Span['93'] = '<span class="itemsprite boarspear24" title="Boar Spear"></span>';
    g_Span['94'] = '<span class="itemsprite defendersspear24" title="Defender\'s Spear"></span>';
    g_Span['95'] = '<span class="itemsprite desertpike24" title="Desert Pike"></span>';
    g_Span['96'] = '<span class="itemsprite desertspear24" title="Desert Spear"></span>';
    g_Span['97'] = '<span class="itemsprite dragonspear24" title="Dragon Spear"></span>';
    g_Span['98'] = '<span class="itemsprite duelingspear24" title="Duelling Spear"></span>';
    g_Span['99'] = '<span class="itemsprite ebonyspear24" title="Ebony Spear"></span>';
    g_Span['100'] = '<span class="itemsprite fangbarbedspear24" title="Fang-Barbed Spear"></span>';
    g_Span['101'] = '<span class="itemsprite fangtippedspear24" title="Fang-Tipped Spear"></span>';
    g_Span['102'] = '<span class="itemsprite forestspear24" title="Forester\'s Spear"></span>';
    g_Span['103'] = '<span class="itemsprite harpoon24" title="Harpoon-Spear"></span>';
    g_Span['104'] = '<span class="itemsprite hilltribespear24" title="Hill-Tribe Spear"></span>';
    g_Span['105'] = '<span class="itemsprite bandedspear24" title="Iron-Banded Spear"></span>';
    g_Span['106'] = '<span class="itemsprite junglehunter24" title="Jungle Hunter\'s Spear"></span>';
    g_Span['107'] = '<span class="itemsprite junglespear24" title="Jungle Spear"></span>';
    g_Span['108'] = '<span class="itemsprite lightspear24" title="Light Spear"></span>';
    g_Span['109'] = '<span class="itemsprite mountainspear24" title="Mountain Spear"></span>';
    g_Span['110'] = '<span class="itemsprite obsidiantipped24" title="Obsidian-Tipped Spear"></span>';
    g_Span['111'] = '<span class="itemsprite pike24" title="Pike"></span>';
    g_Span['112'] = '<span class="itemsprite plainsmansspear24" title="Plainsman\'s Spear"></span>';
    g_Span['113'] = '<span class="itemsprite razoredgedspear24" title="Razor-Edged Spear"></span>';
    g_Span['114'] = '<span class="itemsprite silversteelspear24" title="Silversteel Spear"></span>';
    g_Span['115'] = '<span class="itemsprite trident24" title="Trident"></span>';
    g_Span['116'] = '<span class="itemsprite warspear24" title="War Spear"></span>';

    // swords
    g_Span['40'] = '<span class="itemsprite adventurers24" title="Adventurer\'s Sword"></span>';
    g_Span['41'] = '<span class="itemsprite barbarian24" title="Barbarian Sword"></span>';
    g_Span['42'] = '<span class="itemsprite battlesword24" title="Battle Sword"></span>';
    g_Span['43'] = '<span class="itemsprite bonehandled24" title="Bone Handled Sword"></span>';
    g_Span['44'] = '<span class="itemsprite chitincrafted24" title="Chitin-Crafted Shortsword"></span>';
    g_Span['46'] = '<span class="itemsprite ebonyhilt24" title="Ebony-Hilt Sword"></span>';
    g_Span['48'] = '<span class="itemsprite fangbarbed24" title="Fang-Barbed Sword"></span>';
    g_Span['50'] = '<span class="itemsprite lightsword24" title="Light Sword"></span>';
    g_Span['51'] = '<span class="itemsprite longsword24" title="Longsword"></span>';
    g_Span['52'] = '<span class="itemsprite machete24" title="Machete"></span>';
    g_Span['53'] = '<span class="itemsprite mountaintribe24" title="Mountain-Tribe\'s Sword"></span>';
    g_Span['54'] = '<span class="itemsprite obsidiansword24" title="Obsidian Blade"></span>';
    g_Span['57'] = '<span class="itemsprite razoredged24" title="Razor-Edged Sword"></span>';
    g_Span['58'] = '<span class="itemsprite reinforced24" title="Reinforced Sword"></span>';
    g_Span['59'] = '<span class="itemsprite sabre24" title="Sabre"></span>';
    g_Span['60'] = '<span class="itemsprite scimitar24" title="Scimitar"></span>';
    g_Span['61'] = '<span class="itemsprite seax24" title="Seaxe"></span>';
    g_Span['62'] = '<span class="itemsprite shortsword24" title="Short Sword"></span>';
    g_Span['63'] = '<span class="itemsprite silversteel24" title="Silversteel Sword"></span>';
    g_Span['64'] = '<span class="itemsprite spikedsword24" title="Spiked Sword"></span>';
    g_Span['49'] = '<span class="itemsprite waraxe24" title="War Axe"></span>';

    // bows
    g_Span['67'] = '<span class="itemsprite arcticbow24" title="Arctic Bow"></span>';
    g_Span['68'] = '<span class="itemsprite chitincored24" title="Chitin-Cored Bow"></span>';
    g_Span['76'] = '<span class="itemsprite ironsprung24" title="Composite Bow"></span>';
    g_Span['69'] = '<span class="itemsprite desertbow24" title="Desert Bow"></span>';
    g_Span['70'] = '<span class="itemsprite ebonybow24" title="Ebony Bow"></span>';
    g_Span['72'] = '<span class="itemsprite herosbow24" title="Hero\'s Bow"></span>';
    g_Span['73'] = '<span class="itemsprite highpoweredbow24" title="High-Power Bow"></span>';
    g_Span['74'] = '<span class="itemsprite mercbow24" title="Hillsman\'s Bow"></span>';
    g_Span['75'] = '<span class="itemsprite huntersbow24" title="Hunter\'s Bow"></span>';
    g_Span['77'] = '<span class="itemsprite junglebow24" title="Jungle Bow"></span>';
    g_Span['78'] = '<span class="itemsprite leopardgut24" title="Leopard Gut Bow"></span>';
    g_Span['79'] = '<span class="itemsprite lightbow24" title="Light Bow"></span>';
    g_Span['80'] = '<span class="itemsprite longdraw24" title="Long-Draw Bow"></span>';
    g_Span['81'] = '<span class="itemsprite mammothtusk24" title="Mammoth Tusk Bow"></span>';
    g_Span['82'] = '<span class="itemsprite marksmansbow24" title="Marksman\'s Bow"></span>';
    g_Span['83'] = '<span class="itemsprite mountainbow24" title="Mountain Bow"></span>';
    g_Span['84'] = '<span class="itemsprite plainsbow24" title="Plains Bow"></span>';
    g_Span['85'] = '<span class="itemsprite poachersbow24" title="Poacher\'s Bow"></span>';
    g_Span['86'] = '<span class="itemsprite rapiddraw24" title="Rapid-Draw Bow"></span>';
    g_Span['87'] = '<span class="itemsprite threewood24" title="Three-Wood Bow"></span>';
    g_Span['88'] = '<span class="itemsprite warbow24" title="War Bow"></span>';
    g_Span['89'] = '<span class="itemsprite woodsmansbow24" title="Woodsman\'s Bow"></span>';

    // leather armor
    g_Span['120'] = '<span class="itemsprite animalscale24" title="Animal-Scale Armour"></span>';
    g_Span['121'] = '<span class="itemsprite clothbackedleath24" title="Cloth-Backed Leather"></span>';
    g_Span['122'] = '<span class="itemsprite desertleather24" title="Desert Armour"></span>';
    g_Span['123'] = '<span class="itemsprite xheavyleather24" title="Extra Heavy Armour"></span>';
    g_Span['124'] = '<span class="itemsprite xlightleather24" title="Extra Light Armour"></span>';
    g_Span['125'] = '<span class="itemsprite forestersleath24" title="Forester\'s Armour"></span>';
    g_Span['126'] = '<span class="itemsprite furlinedleath24" title="Fur-Lined Armour"></span>';
    g_Span['127'] = '<span class="itemsprite hardenedleath24" title="Hardened Leather"></span>';
    g_Span['128'] = '<span class="itemsprite heavyleather24" title="Heavy Leather"></span>';
    g_Span['129'] = '<span class="itemsprite highlandleather24" title="Highland Armour"></span>';
    g_Span['130'] = '<span class="itemsprite jungleleather24" title="Jungle Armour"></span>';
    g_Span['131'] = '<span class="itemsprite lightleather24" title="Light Leather"></span>';
    g_Span['132'] = '<span class="itemsprite midnightleather24" title="Midnight Armour"></span>';
    g_Span['133'] = '<span class="itemsprite overpaddedleath24" title="Over-Padded Armour"></span>';
    g_Span['134'] = '<span class="itemsprite plainsleather24" title="Plainsman\'s Armour"></span>';
    g_Span['135'] = '<span class="itemsprite reinforcedleath24" title="Reinforced Leather"></span>';
    g_Span['136'] = '<span class="itemsprite splintmail24" title="Splintmail"></span>';
    g_Span['137'] = '<span class="itemsprite sunburnished24" title="Sun-Burnished Armour"></span>';
    g_Span['138'] = '<span class="itemsprite uplandsleath24" title="Upland Armour"></span>';
    g_Span['139'] = '<span class="itemsprite vanguardleath24" title="Vanguard\'s Armour"></span>';

    // chain armor
    g_Span['141'] = '<span class="itemsprite clothbackedchain24" title="Cloth-Backed Chainmail"></span>';
    g_Span['142'] = '<span class="itemsprite desertchain24" title="Desert Chainmail"></span>';
    g_Span['143'] = '<span class="itemsprite doubleweave24" title="Double-Weave Chainmail"></span>';
    g_Span['144'] = '<span class="itemsprite xheavychain24" title="Extra Heavy Chainmail"></span>';
    g_Span['145'] = '<span class="itemsprite xlightchain24" title="Extra Light Chainmail"></span>';
    g_Span['146'] = '<span class="itemsprite furlinedchain24" title="Fur-Lined Chainmail"></span>';
    g_Span['147'] = '<span class="itemsprite heavychain24" title="Heavy Chain Armour"></span>';
    g_Span['148'] = '<span class="itemsprite highlandchain24" title="Highland Chainmail"></span>';
    g_Span['149'] = '<span class="itemsprite hilltribechain24" title="Hillsman\'s Chainmail"></span>';
    g_Span['150'] = '<span class="itemsprite junglechain24" title="Jungle Chainmail"></span>';
    g_Span['151'] = '<span class="itemsprite lightchain24" title="Light Chain Armour"></span>';
    g_Span['153'] = '<span class="itemsprite overpaddedchain24" title="Over-Padded Chainmail"></span>';
    g_Span['154'] = '<span class="itemsprite plainsmanschain24" title="Plainsman\'s Chainmail"></span>';
    g_Span['155'] = '<span class="itemsprite reinforcedchain24" title="Reinforced Chainmail"></span>';
    g_Span['156'] = '<span class="itemsprite silversteelchain24" title="Silversteel Chainmail"></span>';
    g_Span['157'] = '<span class="itemsprite thickringchain24" title="Thick-Ring Chainmail"></span>';
    g_Span['158'] = '<span class="itemsprite vanguardchain24" title="Vanguard\'s Chainmail"></span>';
    g_Span['159'] = '<span class="itemsprite woodsmanschain24" title="Woodsman\'s Chainmail"></span>';

    // plate armor
    g_Span['162'] = '<span class="itemsprite chainplate24" title="Chain-Edged Platemail"></span>';
    g_Span['163'] = '<span class="itemsprite desertplate24" title="Desert Platemail"></span>';
    g_Span['165'] = '<span class="itemsprite forestersplate24" title="Forester\'s Platemail"></span>';
    g_Span['166'] = '<span class="itemsprite furlinedplate24" title="Fur-Lined Platemail"></span>';
    g_Span['167'] = '<span class="itemsprite heavyplate24" title="Heavy Platemail"></span>';
    g_Span['168'] = '<span class="itemsprite highlandersplate24" title="Highland Platemail"></span>';
    g_Span['169'] = '<span class="itemsprite jungleplate24" title="Jungle Platemail"></span>';
    g_Span['170'] = '<span class="itemsprite lightplate24" title="Light Platemail"></span>';
    g_Span['171'] = '<span class="itemsprite obsidianplate24" title="Obsidian Platemail"></span>';
    g_Span['172'] = '<span class="itemsprite plainsmansplate24" title="Plainsman\'s Platemail"></span>';
    g_Span['173'] = '<span class="itemsprite reinforcedplate24" title="Reinforced Platemail"></span>';
    g_Span['174'] = '<span class="itemsprite silversteelplate24" title="Silversteel Platemail"></span>';
    g_Span['175'] = '<span class="itemsprite spikedplate24" title="Spiked Platemail"></span>';
    g_Span['176'] = '<span class="itemsprite thickenedplate24" title="Thickened Platemail"></span>';
    g_Span['177'] = '<span class="itemsprite paddedplate24" title="Under-Padded Platemail"></span>';
    g_Span['178'] = '<span class="itemsprite uplandplate24" title="Upland Platemail"></span>';
    g_Span['179'] = '<span class="itemsprite vanguardplate24" title="Vanguard\'s Platemail"></span>';

    // basic
    g_Span['1'] = '<span class="resIcon ico-horses" title="Horses"></span>';
    g_Span['3'] = '<span class="resIcon ico-swords" title="Swords"></span>';
    g_Span['4'] = '<span class="resIcon ico-bows" title="Bows"></span>';
    g_Span['5'] = '<span class="resIcon ico-spears" title="Spears"></span>';
    g_Span['8'] = '<span class="resIcon ico-leather" title="Suits of Leather Armour"></span>';
    g_Span['9'] = '<span class="resIcon ico-chainmail" title="Suits of Chainmail Armour"></span>';
    g_Span['10'] = '<span class="resIcon ico-plate" title="Suits of Plate Armour"></span>';
    g_Span['17'] = '<span class="resIcon ico-wood" title="Wood"></span>';
    g_Span['21'] = '<span class="resIcon ico-iron" title="Iron"></span>';
    g_Span['183'] = '<span class="resIcon ico-gold" title="Gold"></span>';
    g_Span['295'] = '<span class="resIcon ico-mana" title="Mana"></span>';
    g_Span['296'] = '<span class="resIcon ico-research" title="Research"></span>';


    // data specifying where on page what items will be displayed
    var g_Horses = [33, 36, 34, 37, 35, 422, 423, 424, 425];

    var g_Spears = new Array();
    for (var i = 91; i < 117; i++)
    {
        g_Spears.push(i);
    }

    var g_Swords = new Array();
    for (var i = 40; i < 66; i++)
    {
        if (i != 49) g_Swords.push(i);
    }
    g_Swords.push(49);

    var g_Bows = new Array();
    g_Bows.push(67, 68, 76);
    for (var i = 69; i < 90; i++)
    {
        if (i != 76) g_Bows.push(i);
    }

    var g_Leather = new Array();
    for (var i = 120; i < 140; i++)
    {
        g_Leather.push(i);
    }

    var g_Chain = new Array();
    for (var i = 141; i < 160; i++)
    {
        g_Chain.push(i);
    }

    var g_Plate = new Array();
    for (var i = 161; i < 180; i++)
    {
        g_Plate.push(i);
    }

    var g_Discoveries = [45, 47, 55, 56, 65, 71, 152, 161, 164, 422, 423, 424, 425];

    var g_Minerals = [202, 205, 211, 193, 199, 203, 195, 194, 200, 204, 208, 210, 209, 207, 196, 198, 206, 212, 201, 197];
    var g_Herbs = [246, 231, 227, 250, 243, 252, 233, 232, 239, 251, 235, 226, 225, 229, 236, 224, 230, 248, 247, 241, 245, 244, 237, 249, 242, 238, 240, 234, 228];
    var g_Animals = new Array();
    for (var i = 298; i < 416; i++)
    {
        g_Animals.push(i);
    }

    var g_Salts = [290, 291, 292, 293];


    // fill usage dictionary based on recipes
    for (var craft_code in g_Recipes)
    {
        var recipeDataArray = g_Recipes[craft_code].split("|");

        for (var i = 0; i < recipeDataArray.length; i++)
        {
            var itemSplit = recipeDataArray[i].split(":");
            var ingredience = parseInt(itemSplit[1]);

            // ignore gold, iron, wood, basic herbs, minerals, hides, mana, basic items (spear, sword, bow, armors, horses)
            if (isBasic(itemSplit[1]) == false)
            {
                if (itemSplit[1] in g_Usage)
                {
                    g_Usage[itemSplit[1]] = g_Usage[itemSplit[1]] + code_span_usage(craft_code);
                }
                else
                {
                    g_Usage[itemSplit[1]] = code_span_usage(craft_code);
                }
            }
        }
    }


    // return true if specified code number is for basic resource
    function isBasic(code_no)
    {
        // basics are: gold, iron, wood, basic herbs, minerals, hides, mana, basic items (spear, sword, bow, armors, horses)
        if ((code_no == 1) || (code_no == 3) || (code_no == 4) || (code_no == 5) ||
            (code_no == 8) || (code_no == 9) || (code_no == 10) || (code_no == 17) ||
            (code_no == 21) || (code_no == 183) || (code_no == 186) || (code_no == 295) ||
            (code_no == 296) || (code_no == 416) || (code_no == 417))
        {
            return true;
        }
        return false;
    }


    // return recipe string with spans for specified code number
    function code_recipe(code_no)
    {
        if (!(code_no in g_Recipes))
        {
            return 'Recipe unknown...';
        }

        var str = g_Recipes[code_no];
        var recipeDataArray = str.split("|");

        var retStr = "";

        for (var i = 0; i < recipeDataArray.length; i++)
        {
            var itemSplit = recipeDataArray[i].split(":");

            if (i != 0)
            {
                retStr = retStr + "&nbsp;&nbsp;&nbsp;";
            }

            retStr = retStr + itemSplit[0] + " " + g_Span[itemSplit[1]];
        }

        return retStr;
    }


    // return name (title) string for specified code number
    function code_name(code_no)
    {
        // get span and then isolate title from it
        var retStr = g_Span[code_no].substring(g_Span[code_no].indexOf("title=") + 7);
        retStr = retStr.substring(0, retStr.indexOf('"'));

        return retStr;
    }


    // return span for specified craftable item that will be used in usage collumn
    // it will be possible to click on it...
    function code_span_usage(code_no)
    {
        // add usage class
        var retStr = g_Span[code_no].replace('class="', 'class="CRAFT_usage_span ');

        // and add data-id="..."
        retStr = retStr.replace('></span>', ' data-id="' + code_no + '"></span>');

        return retStr;
    }


    // append code string [@c=xxx] to span title and return modified span string
    // don't append code for basic resources
    function spanWithCode(code_no)
    {
        if (!(code_no in g_Span))
        {
            return '<span>Missing span data for id ' + code_no + ' </span>';
        }

        var retStr = g_Span[code_no];

        if (isBasic(code_no) == false)
        {
            retStr = retStr.replace('"></span>', ' [@c=' + code_no + ']"></span>');
        }

        return retStr;
    }


    function topTableRow(code_no, dynamic_flag)
    {
        var retStr = '<tr';

        if (dynamic_flag == true) retStr += ' class="CRAFT_dynamic_tr"';

        retStr += '><td class="CRAFT_icon_td">';
        retStr += spanWithCode(code_no);
        retStr += '</td><td class="CRAFT_name_small_td">';
        retStr += code_name(code_no);
        retStr += '</td><td class="CRAFT_usage_td">';

        if(code_no in g_Usage)
        {
            retStr += g_Usage[code_no];
        }
        else
        {
            retStr += "-";
        }

        retStr += '</td></tr>';

        return retStr;
    }


    // insert rows into table after specified row (row_id)
    // used for inserting rows in tables with minerals, herbs or animal parts
    function insertRows(row_id, index_array, first, last)
    {
        for (var i = last; i >= first; i--)
        {
            $(row_id).after(topTableRow(index_array[i], true));
        }
    }


    function resetContentWidth(resize_in)
    {
        // width of content_div should be 60px less then window
        // if window is too small then use add_div width (968px)
        var aNewWidth = Math.max($(window).width() - 60, $("#add_div").width());

        if ($("#content_div").width() != aNewWidth)
        {
            // animate only if div is going to be resized because of click on menu cloud
            if (resize_in === false)
            {
                $("#content_div").animate({width: aNewWidth});
            }
            else
            {
                $("#content_div").width(aNewWidth);
            }
        }

        // refill tables on top of crafting content page based on width if needed
        var newNumberOfTables = 3;
        if (aNewWidth > 1500)
        {
            newNumberOfTables = 5;
        }
        else if (aNewWidth > 1200)
        {
            newNumberOfTables = 4;
        }

        if (newNumberOfTables != g_numberOfTables)
        {
            // action
            if (newNumberOfTables == 5)
            {
                $("div.CRAFT_floating_div").css("width", "20%");
                $("#CRAFT_minerals4_table").parent().css('display', 'block');
                $("#CRAFT_minerals5_table").parent().css('display', 'block');

                $("#CRAFT_herbs4_table").parent().css('display', 'block');
                $("#CRAFT_herbs5_table").parent().css('display', 'block');

                $("#CRAFT_animals4_table").parent().css('display', 'block');
                $("#CRAFT_animals5_table").parent().css('display', 'block');
            }
            else if (newNumberOfTables == 4)
            {
                $("div.CRAFT_floating_div").css("width", "25%");
                $("#CRAFT_minerals4_table").parent().css('display', 'block');
                $("#CRAFT_minerals5_table").parent().css('display', 'none');

                $("#CRAFT_herbs4_table").parent().css('display', 'block');
                $("#CRAFT_herbs5_table").parent().css('display', 'none');

                $("#CRAFT_animals4_table").parent().css('display', 'block');
                $("#CRAFT_animals5_table").parent().css('display', 'none');
            }
            else if (newNumberOfTables == 3)
            {
                $("div.CRAFT_floating_div").css("width", "33%");
                $("#CRAFT_minerals4_table").parent().css('display', 'none');
                $("#CRAFT_minerals5_table").parent().css('display', 'none');

                $("#CRAFT_herbs4_table").parent().css('display', 'none');
                $("#CRAFT_herbs5_table").parent().css('display', 'none');

                $("#CRAFT_animals4_table").parent().css('display', 'none');
                $("#CRAFT_animals5_table").parent().css('display', 'none');
            }
            g_numberOfTables = newNumberOfTables;

            // remove all dynamic rows from all tables
            $(".CRAFT_dynamic_tr").remove();

            // insert table rows
            if (newNumberOfTables == 3)
            {
                // minerals
                insertRows("#CRAFT_minerals1_tr", g_Minerals, 0, 7);
                insertRows("#CRAFT_minerals2_tr", g_Minerals, 8, 12);
                insertRows("#CRAFT_minerals3_tr", g_Minerals, 13, 19);

                // herbs
                insertRows("#CRAFT_herbs1_tr", g_Herbs, 0, 9);
                insertRows("#CRAFT_herbs2_tr", g_Herbs, 10, 19);
                insertRows("#CRAFT_herbs3_tr", g_Herbs, 20, 28);

                // animal parts (118)
                insertRows("#CRAFT_animals1_tr", g_Animals, 0, 40);
                insertRows("#CRAFT_animals2_tr", g_Animals, 41, 79);
                insertRows("#CRAFT_animals3_tr", g_Animals, 80, 117);
            }
            else if (newNumberOfTables == 4)
            {
                // minerals
                insertRows("#CRAFT_minerals1_tr", g_Minerals, 0, 5);
                insertRows("#CRAFT_minerals2_tr", g_Minerals, 6, 10);
                insertRows("#CRAFT_minerals3_tr", g_Minerals, 11, 13);
                insertRows("#CRAFT_minerals4_tr", g_Minerals, 14, 19);

                // herbs
                insertRows("#CRAFT_herbs1_tr", g_Herbs, 0, 7);
                insertRows("#CRAFT_herbs2_tr", g_Herbs, 8, 14);
                insertRows("#CRAFT_herbs3_tr", g_Herbs, 15, 21);
                insertRows("#CRAFT_herbs4_tr", g_Herbs, 22, 28);

                // animal parts
                insertRows("#CRAFT_animals1_tr", g_Animals, 0, 31);
                insertRows("#CRAFT_animals2_tr", g_Animals, 32, 61);
                insertRows("#CRAFT_animals3_tr", g_Animals, 62, 91);
                insertRows("#CRAFT_animals4_tr", g_Animals, 92, 117);
            }
            else if (newNumberOfTables == 5)
            {
                // minerals
                insertRows("#CRAFT_minerals1_tr", g_Minerals, 0, 4);
                insertRows("#CRAFT_minerals2_tr", g_Minerals, 5, 9);
                insertRows("#CRAFT_minerals3_tr", g_Minerals, 10, 11);
                insertRows("#CRAFT_minerals4_tr", g_Minerals, 12, 16);
                insertRows("#CRAFT_minerals5_tr", g_Minerals, 17, 19);

                // herbs
                insertRows("#CRAFT_herbs1_tr", g_Herbs, 0, 5);
                insertRows("#CRAFT_herbs2_tr", g_Herbs, 6, 10);
                insertRows("#CRAFT_herbs3_tr", g_Herbs, 11, 16);
                insertRows("#CRAFT_herbs4_tr", g_Herbs, 17, 22);
                insertRows("#CRAFT_herbs5_tr", g_Herbs, 23, 28);

                // animal parts
                insertRows("#CRAFT_animals1_tr", g_Animals, 0, 24);
                insertRows("#CRAFT_animals2_tr", g_Animals, 25, 47);
                insertRows("#CRAFT_animals3_tr", g_Animals, 48, 71);
                insertRows("#CRAFT_animals4_tr", g_Animals, 72, 95);
                insertRows("#CRAFT_animals5_tr", g_Animals, 96, 117);
            }
        }
    }


    function bottomTableRow(code_no)
    {
        var retStr = '<tr';

        if ($.inArray(code_no, g_Discoveries) != -1)
        {
            retStr += ' class="CRAFT_discovery_tr"';
        }

        retStr += '><td class="CRAFT_icon_td">';
        retStr += g_Span[code_no];
        retStr += '</td><td class="CRAFT_name_td">';
        retStr += code_name(code_no);
        retStr += '</td><td class="CRAFT_code_td">[@c=';
        retStr += code_no;
        retStr += ']</td><td class="CRAFT_recipe_td">';
        retStr += code_recipe(code_no);
        retStr += '</td><td class="CRAFT_effects_td">';
        retStr += g_Effects[code_no];
        retStr += '</td></tr>';

        return retStr;
    }


    function fillBottomTable()
    {
        // add rows with horses
        for (var i = g_Horses.length - 1; i >= 0 ; i--)
        {
            $("#CRAFT_horses_tr").after(bottomTableRow(g_Horses[i]));
        }

        // add rows with spears
        for (var i = g_Spears.length - 1; i >= 0 ; i--)
        {
            $("#CRAFT_spears_tr").after(bottomTableRow(g_Spears[i]));
        }

        // add rows with swords
        for (var i = g_Swords.length - 1; i >= 0 ; i--)
        {
            $("#CRAFT_swords_tr").after(bottomTableRow(g_Swords[i]));
        }

        // add rows with bows
        for (var i = g_Bows.length - 1; i >= 0 ; i--)
        {
            $("#CRAFT_bows_tr").after(bottomTableRow(g_Bows[i]));
        }

        // add rows with leather
        for (var i = g_Leather.length - 1; i >= 0 ; i--)
        {
            $("#CRAFT_leather_tr").after(bottomTableRow(g_Leather[i]));
        }

        // add rows with chain
        for (var i = g_Chain.length - 1; i >= 0 ; i--)
        {
            $("#CRAFT_chain_tr").after(bottomTableRow(g_Chain[i]));
        }

        // add rows with plate
        for (var i = g_Plate.length - 1; i >= 0 ; i--)
        {
            $("#CRAFT_plate_tr").after(bottomTableRow(g_Plate[i]));
        }
    }


    function fillSaltsTable()
    {
        for (var i = g_Salts.length - 1; i >= 0 ; i--)
        {
            $("#CRAFT_salts_tr").after(topTableRow(g_Salts[i]), false);
        }
    }


    function usageSpanClicked(evt)
    {
        evt.stopPropagation();

        var aId = parseInt(evt.target.getAttribute("data-id"));

        // fill popup content
        $("#CRAFT_popup_ico_span").html(g_Span[aId]);
        $("#CRAFT_popup_name_span").html(code_name(aId));
        $("#CRAFT_popup_recipe_div").html(code_recipe(aId));
        $("#CRAFT_popup_effects_div").html(g_Effects[aId]);


        // position...
        var elemPos = $(evt.target).offset();

        elemPos.left = elemPos.left + 34;

        // make popup div visible
        $("#CRAFT_popup_div").css('display', 'block');

        $("#CRAFT_popup_div").offset(elemPos);

        var aPopupHeight = $("#CRAFT_popup_div").outerHeight();
        var aPopupWidth = 318 + 20;

        elemPos.top = elemPos.top - 10 - aPopupHeight;

        // fit to screen?
        var clientWidth = $(window).width();
        var clientHeight = $(window).height();

        var scrollLeft = $(window).scrollLeft();
        var scrollTop = $(window).scrollTop();

        // left
        if (elemPos.left - scrollLeft + aPopupWidth > clientWidth)
        {
            elemPos.left = clientWidth + scrollLeft - aPopupWidth;
        }
        if (elemPos.left < scrollLeft)
        {
            elemPos.left = scrollLeft;
        }

        // top
        if (elemPos.top < scrollTop)
        {
            elemPos.top = elemPos.top + 10 + aPopupHeight + 34;
        }

        // set final position
        $("#CRAFT_popup_div").offset(elemPos);
    }


    function pageClicked()
    {
        // hide popup when there was some click made
        $("#CRAFT_popup_div").css('display', 'none');
    }


    function unbindCrafting()
    {
        $(window).off("resize", resetContentWidth);
        $("#wrapper_div").off("click", pageClicked);
        $("#CRAFT_all_div").off();
    }


    $(document).ready(function()
    {
        // set global Id of current active content - crafting = 1
        // and assign closure function to myUnbindFunction (will be called when other menu is clicked)
        gIllyObjOne.myContentId = 1;
        gIllyObjOne.myUnbindFunction = unbindCrafting;

        // load big crafting css if it was not yet loaded
        if ($('link[href="crafting.css"]').size() == 0)
        {
            if (document.createStyleSheet)
            {
                // IE only method
                document.createStyleSheet('crafting.css');
            }
            else
            {
                // add crafting css to head
                $("head").append($("<link rel='stylesheet' type='text/css' href='crafting.css' />"));
            }
        }

        // construct html string for discoveries <p>
        var disStr = "<b style='font-size: 1.5em'>Discoveries</b> (with light green background in next table):<br /><br />";
        disStr += code_span_usage(65) + code_span_usage(45) + code_span_usage(47) + code_span_usage(56);
        disStr += " - race specific sword after building a level 1 swordsmith<br />";
        disStr += code_span_usage(423) + code_span_usage(424) + code_span_usage(422) + code_span_usage(425);
        disStr += " - race specific mount after 20 crafting researches<br />";
        disStr += code_span_usage(152) + code_span_usage(164) + code_span_usage(71) + code_span_usage(55);
        disStr += " - race specific cool equipment after ???<br />";
        disStr += code_span_usage(161);
        disStr += " - ???";
        $("#CRAFT_discoveries_p").html(disStr);


        fillBottomTable();

        fillSaltsTable();

        // fill top tables based on width (same method as will be called when window is resized)
        resetContentWidth(false);

        // show initialy hidden top tables (3 that are always visible)
        $("#CRAFT_minerals1_table").parent().css('display', 'block');
        $("#CRAFT_minerals2_table").parent().css('display', 'block');
        $("#CRAFT_minerals3_table").parent().css('display', 'block');

        $("#CRAFT_herbs1_table").parent().css('display', 'block');
        $("#CRAFT_herbs2_table").parent().css('display', 'block');
        $("#CRAFT_herbs3_table").parent().css('display', 'block');

        $("#CRAFT_animals1_table").parent().css('display', 'block');
        $("#CRAFT_animals2_table").parent().css('display', 'block');
        $("#CRAFT_animals3_table").parent().css('display', 'block');

        // show content after it is filled
        $("#CRAFT_all_div").css('display', 'block');

        // when browser is resized call resetContentWidth
        $(window).resize(resetContentWidth);

        // attach jquery delegate to container div so that it will be called when any "usage" span is clicked
        $("#CRAFT_all_div").on("click", ".CRAFT_usage_span", usageSpanClicked);

        // attach jquery delegate to wrapper div (whole page) so that it will be called when any click is made
        // it will hide popup div if visible
        $("#wrapper_div").on("click", pageClicked);

        // preload popup background image (create img element without showing it)
        $('<img src="popup.png" />');

        // from this point allow menu clicks (user can request changing content)
        gIllyObjOne.myContentChangeRequested = false;
    });

})();
