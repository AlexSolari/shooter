{"filter":false,"title":"script.js","tooltip":"/client/script/script.js","undoManager":{"mark":100,"position":100,"stack":[[{"start":{"row":33,"column":59},"end":{"row":34,"column":0},"action":"insert","lines":["",""],"id":1317},{"start":{"row":34,"column":0},"end":{"row":34,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":34,"column":4},"end":{"row":36,"column":5},"action":"remove","lines":["","    if (isActive)","    {"],"id":1318}],[{"start":{"row":35,"column":6},"end":{"row":41,"column":9},"action":"remove","lines":["drawer.Clear();","      coords.forEach(function (coord) {","          if (coord.type != \"common-ship\")","            drawer.Circle(coord.x, coord.y, 2);","          else","            drawer.Image(\"sprite.png\", coord.x, coord.y, coord.angle+90);","      });"],"id":1319}],[{"start":{"row":35,"column":4},"end":{"row":36,"column":5},"action":"remove","lines":["  ","    }"],"id":1320},{"start":{"row":35,"column":4},"end":{"row":41,"column":9},"action":"insert","lines":["drawer.Clear();","      coords.forEach(function (coord) {","          if (coord.type != \"common-ship\")","            drawer.Circle(coord.x, coord.y, 2);","          else","            drawer.Image(\"sprite.png\", coord.x, coord.y, coord.angle+90);","      });"]}],[{"start":{"row":36,"column":4},"end":{"row":36,"column":6},"action":"remove","lines":["  "],"id":1321}],[{"start":{"row":37,"column":4},"end":{"row":37,"column":6},"action":"remove","lines":["  "],"id":1322}],[{"start":{"row":38,"column":4},"end":{"row":38,"column":6},"action":"remove","lines":["  "],"id":1324}],[{"start":{"row":39,"column":4},"end":{"row":39,"column":6},"action":"remove","lines":["  "],"id":1325}],[{"start":{"row":40,"column":4},"end":{"row":40,"column":6},"action":"remove","lines":["  "],"id":1326}],[{"start":{"row":41,"column":4},"end":{"row":41,"column":6},"action":"remove","lines":["  "],"id":1327}],[{"start":{"row":52,"column":58},"end":{"row":56,"column":54},"action":"remove","lines":["","","window.onfocus = function() { this.isActive = true; };","","window.onblur = function() { this.isActive = false; };"],"id":1328}],[{"start":{"row":5,"column":43},"end":{"row":6,"column":20},"action":"remove","lines":["","var isActive = true;"],"id":1329}],[{"start":{"row":38,"column":12},"end":{"row":39,"column":0},"action":"insert","lines":["",""],"id":1330},{"start":{"row":39,"column":0},"end":{"row":39,"column":8},"action":"insert","lines":["        "]}],[{"start":{"row":39,"column":8},"end":{"row":39,"column":9},"action":"insert","lines":["{"],"id":1331}],[{"start":{"row":40,"column":71},"end":{"row":41,"column":0},"action":"insert","lines":["",""],"id":1332},{"start":{"row":41,"column":0},"end":{"row":41,"column":10},"action":"insert","lines":["          "]}],[{"start":{"row":41,"column":10},"end":{"row":41,"column":11},"action":"insert","lines":["}"],"id":1333},{"start":{"row":41,"column":0},"end":{"row":41,"column":10},"action":"remove","lines":["          "]},{"start":{"row":41,"column":0},"end":{"row":41,"column":8},"action":"insert","lines":["        "]}],[{"start":{"row":40,"column":71},"end":{"row":41,"column":0},"action":"insert","lines":["",""],"id":1334},{"start":{"row":41,"column":0},"end":{"row":41,"column":10},"action":"insert","lines":["          "]}],[{"start":{"row":41,"column":10},"end":{"row":41,"column":16},"action":"insert","lines":["drawer"],"id":1335}],[{"start":{"row":41,"column":16},"end":{"row":41,"column":17},"action":"insert","lines":["."],"id":1336}],[{"start":{"row":41,"column":17},"end":{"row":41,"column":18},"action":"insert","lines":["t"],"id":1337}],[{"start":{"row":41,"column":17},"end":{"row":41,"column":18},"action":"remove","lines":["t"],"id":1338}],[{"start":{"row":41,"column":17},"end":{"row":41,"column":18},"action":"insert","lines":["T"],"id":1339}],[{"start":{"row":41,"column":18},"end":{"row":41,"column":19},"action":"insert","lines":["e"],"id":1340}],[{"start":{"row":41,"column":19},"end":{"row":41,"column":20},"action":"insert","lines":["x"],"id":1341}],[{"start":{"row":41,"column":20},"end":{"row":41,"column":21},"action":"insert","lines":["t"],"id":1342}],[{"start":{"row":41,"column":21},"end":{"row":41,"column":23},"action":"insert","lines":["()"],"id":1343}],[{"start":{"row":41,"column":23},"end":{"row":41,"column":24},"action":"insert","lines":[";"],"id":1344}],[{"start":{"row":41,"column":22},"end":{"row":41,"column":24},"action":"insert","lines":["\"\""],"id":1345}],[{"start":{"row":41,"column":23},"end":{"row":41,"column":24},"action":"remove","lines":["\""],"id":1346}],[{"start":{"row":41,"column":22},"end":{"row":41,"column":23},"action":"remove","lines":["\""],"id":1347}],[{"start":{"row":41,"column":22},"end":{"row":41,"column":23},"action":"insert","lines":["c"],"id":1348}],[{"start":{"row":41,"column":23},"end":{"row":41,"column":24},"action":"insert","lines":["o"],"id":1349}],[{"start":{"row":41,"column":24},"end":{"row":41,"column":25},"action":"insert","lines":["o"],"id":1350}],[{"start":{"row":41,"column":25},"end":{"row":41,"column":26},"action":"insert","lines":["r"],"id":1351}],[{"start":{"row":41,"column":26},"end":{"row":41,"column":27},"action":"insert","lines":["."],"id":1352}],[{"start":{"row":41,"column":27},"end":{"row":41,"column":28},"action":"insert","lines":["h"],"id":1353}],[{"start":{"row":41,"column":28},"end":{"row":41,"column":29},"action":"insert","lines":["p"],"id":1354}],[{"start":{"row":41,"column":29},"end":{"row":41,"column":30},"action":"insert","lines":[","],"id":1355}],[{"start":{"row":41,"column":30},"end":{"row":41,"column":31},"action":"insert","lines":[" "],"id":1356}],[{"start":{"row":41,"column":31},"end":{"row":41,"column":32},"action":"insert","lines":["c"],"id":1357}],[{"start":{"row":41,"column":32},"end":{"row":41,"column":33},"action":"insert","lines":["o"],"id":1358}],[{"start":{"row":41,"column":33},"end":{"row":41,"column":34},"action":"insert","lines":["o"],"id":1359}],[{"start":{"row":41,"column":31},"end":{"row":41,"column":34},"action":"remove","lines":["coo"],"id":1360},{"start":{"row":41,"column":31},"end":{"row":41,"column":36},"action":"insert","lines":["coord"]}],[{"start":{"row":41,"column":36},"end":{"row":41,"column":37},"action":"insert","lines":["/"],"id":1361}],[{"start":{"row":41,"column":36},"end":{"row":41,"column":37},"action":"remove","lines":["/"],"id":1362}],[{"start":{"row":41,"column":36},"end":{"row":41,"column":37},"action":"insert","lines":["."],"id":1363}],[{"start":{"row":41,"column":37},"end":{"row":41,"column":38},"action":"insert","lines":["x"],"id":1364}],[{"start":{"row":41,"column":38},"end":{"row":41,"column":39},"action":"insert","lines":[" "],"id":1365}],[{"start":{"row":41,"column":39},"end":{"row":41,"column":40},"action":"insert","lines":["+"],"id":1366}],[{"start":{"row":41,"column":40},"end":{"row":41,"column":41},"action":"insert","lines":[" "],"id":1367}],[{"start":{"row":41,"column":39},"end":{"row":41,"column":40},"action":"remove","lines":["+"],"id":1368}],[{"start":{"row":41,"column":39},"end":{"row":41,"column":40},"action":"insert","lines":["1"],"id":1369}],[{"start":{"row":41,"column":40},"end":{"row":41,"column":41},"action":"insert","lines":["0"],"id":1370}],[{"start":{"row":41,"column":38},"end":{"row":41,"column":39},"action":"insert","lines":[" "],"id":1371}],[{"start":{"row":41,"column":39},"end":{"row":41,"column":40},"action":"insert","lines":["-"],"id":1372}],[{"start":{"row":41,"column":43},"end":{"row":41,"column":44},"action":"insert","lines":[","],"id":1373}],[{"start":{"row":41,"column":44},"end":{"row":41,"column":45},"action":"insert","lines":[" "],"id":1374}],[{"start":{"row":41,"column":45},"end":{"row":41,"column":46},"action":"insert","lines":["c"],"id":1375}],[{"start":{"row":41,"column":46},"end":{"row":41,"column":47},"action":"insert","lines":["o"],"id":1376}],[{"start":{"row":41,"column":47},"end":{"row":41,"column":48},"action":"insert","lines":["o"],"id":1377}],[{"start":{"row":41,"column":45},"end":{"row":41,"column":48},"action":"remove","lines":["coo"],"id":1378},{"start":{"row":41,"column":45},"end":{"row":41,"column":50},"action":"insert","lines":["coord"]}],[{"start":{"row":41,"column":50},"end":{"row":41,"column":51},"action":"insert","lines":["."],"id":1379}],[{"start":{"row":41,"column":51},"end":{"row":41,"column":52},"action":"insert","lines":["y"],"id":1380}],[{"start":{"row":41,"column":52},"end":{"row":41,"column":53},"action":"insert","lines":[" "],"id":1381}],[{"start":{"row":41,"column":53},"end":{"row":41,"column":54},"action":"insert","lines":["-"],"id":1382}],[{"start":{"row":41,"column":54},"end":{"row":41,"column":55},"action":"insert","lines":[" "],"id":1383}],[{"start":{"row":41,"column":55},"end":{"row":41,"column":56},"action":"insert","lines":["1"],"id":1384}],[{"start":{"row":41,"column":56},"end":{"row":41,"column":57},"action":"insert","lines":["0"],"id":1385}],[{"start":{"row":41,"column":26},"end":{"row":41,"column":27},"action":"insert","lines":["d"],"id":1386}],[{"start":{"row":41,"column":58},"end":{"row":41,"column":59},"action":"insert","lines":[","],"id":1387}],[{"start":{"row":41,"column":59},"end":{"row":41,"column":60},"action":"insert","lines":[" "],"id":1388}],[{"start":{"row":41,"column":60},"end":{"row":41,"column":61},"action":"insert","lines":["1"],"id":1389}],[{"start":{"row":41,"column":61},"end":{"row":41,"column":62},"action":"insert","lines":["6"],"id":1390}],[{"start":{"row":41,"column":61},"end":{"row":41,"column":62},"action":"remove","lines":["6"],"id":1391}],[{"start":{"row":41,"column":60},"end":{"row":41,"column":61},"action":"remove","lines":["1"],"id":1392}],[{"start":{"row":41,"column":60},"end":{"row":41,"column":61},"action":"insert","lines":["8"],"id":1393}],[{"start":{"row":41,"column":61},"end":{"row":41,"column":62},"action":"remove","lines":[" "],"id":1394}],[{"start":{"row":41,"column":30},"end":{"row":41,"column":31},"action":"insert","lines":[" "],"id":1395}],[{"start":{"row":41,"column":31},"end":{"row":41,"column":32},"action":"insert","lines":["+"],"id":1396}],[{"start":{"row":41,"column":32},"end":{"row":41,"column":33},"action":"insert","lines":[" "],"id":1397}],[{"start":{"row":41,"column":33},"end":{"row":41,"column":35},"action":"insert","lines":["\"\""],"id":1398}],[{"start":{"row":41,"column":34},"end":{"row":41,"column":35},"action":"insert","lines":["/"],"id":1399}],[{"start":{"row":41,"column":35},"end":{"row":41,"column":36},"action":"insert","lines":["1"],"id":1400}],[{"start":{"row":41,"column":36},"end":{"row":41,"column":37},"action":"insert","lines":["0"],"id":1401}],[{"start":{"row":41,"column":37},"end":{"row":41,"column":38},"action":"insert","lines":["0"],"id":1402}],[{"start":{"row":41,"column":38},"end":{"row":41,"column":39},"action":"insert","lines":["0"],"id":1403}],[{"start":{"row":41,"column":70},"end":{"row":41,"column":71},"action":"remove","lines":["8"],"id":1404},{"start":{"row":41,"column":70},"end":{"row":41,"column":71},"action":"insert","lines":["1"]}],[{"start":{"row":41,"column":71},"end":{"row":41,"column":72},"action":"insert","lines":["0"],"id":1405}],[{"start":{"row":41,"column":49},"end":{"row":41,"column":54},"action":"remove","lines":[" - 10"],"id":1406}],[{"start":{"row":41,"column":49},"end":{"row":41,"column":50},"action":"insert","lines":["-"],"id":1407}],[{"start":{"row":41,"column":50},"end":{"row":41,"column":51},"action":"insert","lines":["0"],"id":1408}],[{"start":{"row":41,"column":51},"end":{"row":41,"column":52},"action":"insert","lines":["0"],"id":1409}],[{"start":{"row":41,"column":50},"end":{"row":41,"column":51},"action":"insert","lines":["2"],"id":1410}],[{"start":{"row":41,"column":51},"end":{"row":41,"column":52},"action":"remove","lines":["0"],"id":1411}],[{"start":{"row":41,"column":50},"end":{"row":41,"column":51},"action":"remove","lines":["2"],"id":1412}],[{"start":{"row":41,"column":50},"end":{"row":41,"column":51},"action":"insert","lines":["5"],"id":1413}],[{"start":{"row":41,"column":50},"end":{"row":41,"column":51},"action":"remove","lines":["5"],"id":1414}],[{"start":{"row":41,"column":50},"end":{"row":41,"column":51},"action":"insert","lines":["4"],"id":1415}],[{"start":{"row":41,"column":50},"end":{"row":41,"column":51},"action":"remove","lines":["4"],"id":1416}],[{"start":{"row":41,"column":50},"end":{"row":41,"column":51},"action":"insert","lines":["3"],"id":1417}],[{"start":{"row":41,"column":64},"end":{"row":41,"column":65},"action":"remove","lines":["1"],"id":1418},{"start":{"row":41,"column":64},"end":{"row":41,"column":65},"action":"insert","lines":["2"]}]]},"ace":{"folds":[],"scrolltop":300,"scrollleft":0,"selection":{"start":{"row":35,"column":37},"end":{"row":35,"column":37},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":16,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1453831222000,"hash":"a41ff3732da3cab3b1b0cacb9fdf883e7e2c0d21"}