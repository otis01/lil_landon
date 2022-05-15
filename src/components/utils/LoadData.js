
import React, { useState, useEffect } from 'react';


const loadData = async(url, callback) => {
    const resp = await fetch(url);
    let jsonData = await resp.json();
    callback(jsonData);
};

export default loadData;
