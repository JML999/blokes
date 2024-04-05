import React, { useState, useEffect } from 'react';
import axios from 'axios';
import smallStan from './SmallStan.png';
import { Spinner } from 'react-bootstrap';


const Dashboard = ({ account, nftContract }) => {
    const [tokenData, setTokenData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://hychain.calderaexplorer.xyz/api/v2/addresses/${account}/token-transfers`, {
                    params: {
                        type: 'ERC-721',
                        filter: 'to | from',
                        token: '0xEb6F6c95C1A31C97e61a0f18CFB02c544DFE7436'
                    }
                });

                // Extract token_id, from, and to from the response data
                const tokenDataArray = response.data.items.map(item => {
                    const token_id = item.total.token_id;
                    const from = item.from ? item.from.hash.toLowerCase() : null;
                    const to = item.to ? item.to.hash.toLowerCase() : null;
                    return [token_id, from, to];
                });

                console.log('Token Data:', tokenDataArray);

                // Filter tokens sent to us but not from us
                const filteredTokens = tokenDataArray.filter(token => token[2] === account.toLowerCase() && token[1] !== account.toLowerCase());

                // Check ownership of filtered tokens
                const verifiedTokens = await Promise.all(filteredTokens.map(async token => {
                    try {
                        const owner = await nftContract.ownerOf(token[0]);
                        if (owner.toLowerCase() === account.toLowerCase()) {
                            return token;
                        }
                    } catch (error) {
                        console.error('Error checking token ownership:', error);
                    }
                    return null;
                }));

                // Remove null values from the array
                const finalTokens = verifiedTokens.filter(token => token !== null);

                console.log('Final Tokens:', finalTokens);

                setTokenData(finalTokens);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching token data:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [account, nftContract]);

    return (
        <div className="token-row" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {isLoading ? (
                <Spinner animation="border" style={{ display: 'flex' }} />
            ) : (
                tokenData.map((token, index) => (
                    <div key={index} className="token-item" style={{ marginRight: '10px', marginBottom: '10px', paddingTop: '60px' }}>
                        <img src={smallStan} alt={`Token ${token[0]}`} style={{ width: '80px', height: '100px' }} />
                        <p style={{ fontSize: '12px', fontFamily: 'Minecraftia', textAlign: 'center' }}>{token[0]}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default Dashboard;













