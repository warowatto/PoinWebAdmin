const router = require('express').Router();
const db = require('../modules/database');

// test
router.get('/', (req, res) => {

    let machines = [1, 3, 5];
    let query = `
    SELECT * FROM Machines
    WHERE id in (?)`;

    db.query(query, [machines])
        .then(row => {
            res.status(200).json(row);
        })
        .catch(err => {
            res.status(500).json(err);
        });

})

// 업체별 판매 현황
router.get('/company/:id', (req, res) => {
    let companyId = req.params.id;
    let query = `SELECT * FROM Payments WHERE companyId = ?`;

    db.query(query, [companyId])
        .then(row => {
            res.status(200).json(row);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

// 업체 장비 목록
router.get('/company/:id/machines', (req, res) => {
    let companyId = req.params.id;
    let query = `SELECT * FROM Machines WHERE companyId = ?`;

    db.query(query, [companyId])
        .then(row => {
            res.status(200).json(row);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

// 업체 장비 목록 조회
router.get('/company/:id/machine/:machineId', (req, res) => {
    let companyId = req.params.id;
    let machineId = req.params.machineId;

    let query = `
    SELECT 
        * 
    FROM Machines
    WHERE
        companyId = ?
        AND
        id = ?`;

    db.query(query, [companyId, machineId])
        .then(row => {
            res.status(200).json(row);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

// 업체 상품 미등록 장치
router.get('/company/:id/machines/product', (req, res) => {
    let companyId = req.params.id;

    let query = `
    SELECT 
        id, macAddress, deviceName, displayName, description, isRunning, create_at
    FROM Machines 
    LEFT OUTER JOIN MachineProducts ON Machines.id = MachineProducts.machineId 
    WHERE 
        Machines.companyId = ?
        AND
        MachineProducts.machineId is NULL`;

    db.query(query, [companyId])
        .then(row => {
            res.status(200).json(row);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

// 업체 장치 상품 등록
router.post('/company/:id/machines/product', (req, res) => {
    let products = req.body.products;
    let machines = req.body.machines;

    res.status(200).json({
        products: products,
        machines: machines
    });
})

// 장비별 판매 현황
router.get('/machine/:id', (req, res) => {
    let companyId = req.params.id;
    let query = `SELECT * FROM Payments WHERE machineId = ?`;

    db.query(query, [companyId])
        .then(row => {
            res.status(200).json(row);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

// 
router.get('/', (req, res) => {
    res.send('hello');
});

// 장비 상품등록

// 장비 동작 설정
router.put('/company/:id/machines', (req, res) => {
    let companyId = req.params.id;
    let machines = req.body.machines;
    let status = req.body.status;

    let query = `
    UPDATE Machines
    SET isRunning = ?
    WHERE id in (?)`;

    db.query(query, [status, machines])
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

// 업체 정보 관리

module.exports = router;