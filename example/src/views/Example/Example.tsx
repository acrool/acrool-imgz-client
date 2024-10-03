import {useCallback, useRef, useState} from 'react';
import styled from 'styled-components';
import {Col, Container, Flex, Row} from '@acrool/react-grid';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import ImgzClient from '@acrool/imgz-client';



interface IForm {
    sourceFile: File
}


const Example = () => {
    const logRef = useRef<HTMLDivElement>(null);
    const [blobImg, setBlobImg] = useState<string>();

    const HookForm = useForm<{sourceFile}>();

    /**
     * 送出表單
     * @param data
     */
    const handleSubmitHandler: SubmitHandler<IForm> = useCallback(async formData => {
        const imgzClient = new ImgzClient('/api');

        const options = {
            resize: {width: 250},
            quality: 90,
            timeout: 10000,  // Example timeout
        };
        await imgzClient
            .squashWebp(formData.sourceFile[0], options)
            .then(client => {
                setBlobImg(client.toBlobUrl);
            });

    }, []);






    return <div style={{display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start', width: '100%'}}>
        <Log ref={logRef}/>

        <form onSubmit={HookForm.handleSubmit(handleSubmitHandler)} className="mx-auto">

            <Flex column className="justify-content-center gap-2">
                <Controller
                    control={HookForm.control}
                    name="sourceFile"
                    defaultValue={[]}
                    render={({field}) => {
                        return <input
                            type="file"
                            onChange={(e) => field.onChange(e.target.files)} // 將 files 傳入表單控制
                        />;
                    }}
                />

                <SuccessButton type="submit">Submit</SuccessButton>
            </Flex>
        </form>


        <Container>
            <Row className="gy-3">
                {/*<Col col={12} md={6}>*/}
                {/*</Col>*/}
                <Col col={12} md={6}>
                    {blobImg &&
                        <img src={blobImg} alt="blob img"/>
                    }
                </Col>
            </Row>
        </Container>
    </div>;
};

export default Example;


const Log = styled.div`
  white-space: pre-line;
`;

const SuccessButton = styled.button`
  background-color: #2c32a9;
  color: #fff;
`;

