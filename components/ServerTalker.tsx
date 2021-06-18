import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";



export const ServerTalker = () => {
	const [info, setInfo] = useState('not yet')

	const queryServer = async (str) => {
		const res = await axios.get(`http://localhost:5000/?hello=${str}`)
		console.log('res.data :>> ', res.data);
		setInfo(res.data)
	}

	useEffect(() => {
		queryServer("1")
	}, [])

	return (
		<>
			<h1>{info}</h1>
			<button onClick={() => queryServer("hello")}>INCR</button>
		</>
	)


}