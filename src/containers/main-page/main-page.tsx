import React, { FC, FormEvent, memo, useCallback } from 'react';

import { MainPage } from '../../components/main-page';

const Container: FC = () => {
    const handleAuth = useCallback(
        (e: FormEvent<HTMLButtonElement>) => {
            e.preventDefault();

            console.log('Авторизация...');
        }, []
    );

    return <MainPage 
        handleAuth={handleAuth}
    />
}

export const MainPageContainer = memo(Container);