import { Card, CardHeader, Grid } from "@material-ui/core";
import React from "react";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

const TopGenreGraph = ({ genres }) => {
    return (
        <Grid
            item
            xs={12}
            style={{
                marginTop: 200,
            }}
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            <Card
                className={"MuiElevatedCard--01"}
                style={{
                    width: 700,
                    height: 400,
                }}
            >
                <CardHeader
                    className={"MuiCardHeader-root-3"}
                    title={"Your Top 5 Genres"}
                    classes={{
                        title: "MuiCardHeader-title",
                    }}
                />
                <BarChart
                    style={{
                        margin: 40,
                    }}
                    width={600}
                    height={350}
                    data={genres}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid
                        style={{
                            color: "white",
                        }}
                        strokeDasharray="3 3"
                    />
                    <XAxis stroke="white" dataKey="name" fill="#1DB954" />
                    <YAxis />
                    <Tooltip></Tooltip>
                    <Bar dataKey="count" fill="#1DB954" />
                </BarChart>
            </Card>
        </Grid>
    );
};

export default TopGenreGraph;
