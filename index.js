const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const moment = require('moment')

const app = express()
app.use(cors())
app.use(bodyParser.json())

pointsTotal={};
allPoints=[];

app.post('/spendPoints',(req,res)=>{
    let sum=0;
    let reqpoints=req.body.points;
    for(let value in pointsTotal)
    {
        sum+=pointsTotal[value];
    }
    //check if the points requested to be deducted is lesser than the available points
    if(sum<reqpoints)
    {
        res.send({"Message":"Available points is lesser than the deduction request"});
    }

    else
    {
        //sorting in descending order
        allPoints= allPoints.sort((a,b)=> { return new Date(a.time) - new Date(b.time) });
        remaining=reqpoints;
        deductedJSON={};
        //calculating deductable points
        for(let x=0;x<allPoints.length;x++)
        {
            let deducted=0;
            collectedPoints=allPoints[x];
            if(collectedPoints.points-remaining>=0)
            {
                deducted=remaining;
                allPoints[x].points-=deducted;
            }
            else
            {
                deducted=collectedPoints.points;
                allPoints[x].points=0;
            }
            deducted*=parseInt(-1);
            remaining+=deducted;
            if(deductedJSON[collectedPoints.payer])
                deductedJSON[collectedPoints.payer]+=deducted;
            else
                deductedJSON[collectedPoints.payer]=deducted;

            if(remaining<=0)
            {
                //resetting pointsTotal to 0 to calculate fresh
                for(let z in pointsTotal)
                {
                    pointsTotal[z]=0;
                }

                //removing the 0 points used up user entries
                for(let y=0;y<allPoints.length;y++)
                {
                    if(allPoints[y].points==0)
                    {
                        allPoints.splice(y,1);
                        y--;
                    }
                    else
                    {
                        if(pointsTotal[allPoints[y].payer])
                            pointsTotal[allPoints[y].payer]+=allPoints[y].points;
                        else
                            pointsTotal[allPoints[y].payer]=allPoints[y].points;
                    }
                }
                //sending response and breazing out
                res.send(deductedJSON);
                break;
            }

        }
    }

});

app.post('/addPoints', (req, res)=>{
    //pushing into ditributedPoints and totaling the points in pointsTotal letiables
    record=req.body;
    record.time=moment(record.time,"MM/DD/YYYY h:m a").toDate();

    allPoints.push(record);

        if(pointsTotal[record.payer])
        {
            pointsTotal[record.payer]+=record.points;
        }
        else
        {
            pointsTotal[record.payer]=record.points;
        }

    console.log(allPoints);
    res.send(pointsTotal);  
});


app.get('/getTotal',(req,res)=>{
    res.send(pointsTotal);
});


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`))