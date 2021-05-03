import React from 'react';
import "./InfoBox.css";
import {Card , CardContent, Typography} from '@material-ui/core';

function InfoBox({title, cases, total}) {
    return (
        <Card className="infobox">
            <CardContent>
                {/* Title*/}
                <Typography className = "infobox__title" color="textSecondary">
                    {title}

                </Typography>


                {/*Number of cases */}
                <h2 className="infobox__cases">
                    {cases} 
                </h2>



                {/* Total */}
                <Typography className="infobox__total">
                    Total {total} 
                </Typography>

            </CardContent>
            
        </Card>
    )
}

export default InfoBox
