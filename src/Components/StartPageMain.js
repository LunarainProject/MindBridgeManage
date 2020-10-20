import React, { Component } from 'react';
import { Button, Box, Container, Typography, } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Iframe from 'react-iframe';
import discImg from "../img/disc.png";

import dImg from "../img/d.png";
import iImg from "../img/i.png";
import sImg from "../img/s.png";
import cImg from "../img/c.png";


class StartPageMain extends Component {

    render() {

        const surveyLink = "/manage/ee/27/" + this.props.id;

        return (
            <Box style={{ marginBottom: "80px" }}>
                <Box style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                    <Typography variant="h6" style={{ fontWeight: "700" }}>
                        부부 행동 유형 검사란?
                    </Typography>
                </Box>
                <Box style={{ marginTop: "20px" }}>
                    <Box style={{ padding: "10px", marginTop: "10px" }} boxShadow={2}>
                        <Typography variant="h7">
                            &nbsp;사람마다 자신만이 가지고 있는 독특한 행동유형이 있는데 자신이 어떤 행동유형을 가지고 있는지 확인해 보는 것이 부부행동유형 검사입니다. <br />&nbsp;이 검사는 행동 유형이 어느 쪽으로 높게 나오느냐에 따라 주도형, 사교형, 안정형, 신중형으로 나눌수 있습니다.
                        </Typography>
                    </Box>
                </Box>
                <Box style={{ marginTop: "30px" }}>
                    <Iframe url="https://www.youtube.com/embed/PnuQEIde5DU?rel=0&controls=0&disablekb=0&enablejsapi=1&showinfo=0"
                        rel="0"
                        width="100%"
                        height="250px"
                        id="myId"
                        className="myClassname"
                        display="initial"
                        position="relative" />
                </Box>

                <Container style={{ margin: "20px 0", width: "100%", display: "flex", flexDirection: "row", justifyContent: "center" }}>
                    <Box boxShadow={2} style={{ cursor: "pointer" }}>
                        <Link to={surveyLink}>
                            <Button style={{ background: "#ffbad1", width: "270px", height: "50px", }}>
                                <Typography variant="h6">
                                    테스트 시작하기
                                </Typography>
                            </Button>
                        </Link>
                    </Box>
                </Container>

                <Box style={{ marginTop: "10px", marginBottom: "10px" }}>
                    <Box>
                        <Typography variant="h6" style={{ padding: "5px", fontWeight: "700", display: "flex", flexDirection: "row", justifyContent: "center" }}>
                            부부 행동 유형 테스트 목적?
                        </Typography>
                        <Box style={{ padding: "10px", marginTop: "10px" }} boxShadow={2}>
                            <Typography variant="h7" style={{ padding: "10px", boxSizing: "border-box" }}>
                                &nbsp;자신의 행동유형과 강점을 발견하고 이를 활용하고 배우자의 행동을 이해하고 효과적으로 상호 관계를 유지하고 개선할 수 있으며 서로에게 맞는 갈등관리, 관계 유지방법, 학습방법을 발견할 수 있습니다.
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Box style={{ marginTop: "10px" }}>
                    <img src={discImg} style={{ width: "100%" }}></img>
                </Box>

                <Box style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
                    <Box style={{ display: "flex", flexDirection: "row" }}>
                        <Box boxShadow={2} style={{ width: "67%", padding: "10px", marginRight: "3%" }}>
                            <Typography variant="h6" color="primary" style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                주도형
                            </Typography>
                            <Typography variant="h6" color="primary" style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                (Dominance,리더형)
                            </Typography>
                            <Typography variant="h6" color="primary" style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                3%분포
                            </Typography>
                            <Typography variant="h7" style={{ marginTop: "10px", display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
                                결과를 성취하기 위해 장애를 극복함으로써 스스로 환경을 조성한다.
                            </Typography>
                        </Box>
                        <Box style={{ width: "30%" }}>
                            <img src={dImg} style={{ width: "100%" }} />
                        </Box>
                    </Box>
                    <Box style={{ marginTop: "20px", width: "100%", padding: "10px", boxSizing: "border-box" }} boxShadow={2}>
                        <Typography variant="h6" color="primary" style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                            주도형(D)의 특징
                            </Typography>
                        <Typography variant="h7" style={{ marginTop: "10px", display: "flex", flexDirection: "row", justifyContent: "flex-start", paddingLeft: "15px" }}>
                            - 자아가 강하다. <br />
                                - 목표 지향적이다. <br />
                                - 도전에 의해 동기부여 된다. <br />
                                - 통제권을 상실하거나, <br />
                                - 이용당하는 것을 두려워 한다. <br />
                                - 압력하에서 다른 사람의 견해, <br />
                                - 감정을 별로 고려하지 않을 수 있다.
                            </Typography>
                    </Box>
                    <Box style={{ marginTop: "20px", width: "100%", padding: "10px", boxSizing: "border-box" }} boxShadow={2}>
                        <Typography variant="h6" color="primary" style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                            주도형(D)의 장단점
                            </Typography>
                        <Typography variant="h7" style={{ marginTop: "10px", display: "flex", flexDirection: "row", justifyContent: "flex-start", paddingLeft: "15px" }}>
                            장점: 즉시 성과를 올린다. 자신감이 있다. 신속한 결정을 내린다. 도전을 받아들인다. 포기하지 않는다. 열심히 일한다. 책임을 떠맡는다. 문제를 피하지 않고 해결하려고 한다.
                            </Typography>
                        <Typography variant="h7" style={{ marginTop: "10px", display: "flex", flexDirection: "row", justifyContent: "flex-start", paddingLeft: "15px" }}>
                            단점: 조급하다. 지나치게 많은 일을 떠맡는다. 다른 사람에 대해 무관심하다. 세부 사항을 무시한다. 위험 부담과 경고를 간과한다. 제한받는 것을 참지 못한다. 융통성이 없고 고집이 세다. 다른 사람들에게 너무 많은 요구를 한다.
                            </Typography>
                    </Box>
                    <Box style={{ marginTop: "20px", width: "100%", padding: "10px", boxSizing: "border-box" }} boxShadow={2}>
                        <Typography variant="h6" color="primary" style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                            주도형(D)의 부족한점을 보완하려면..
                            </Typography>
                        <Typography variant="h7" style={{ marginTop: "10px", display: "flex", flexDirection: "row", justifyContent: "flex-start", paddingLeft: "15px" }}>
                            - 결과에 심사숙고 할 시간적 여유를 가짐 <br />
                                - 다른 사람의 의견을 존중하고 의사 소통시 예의를 지킴 <br />
                                - 상호 협상능력을 키움 <br />
                                - 결론보다 과정을 설명함 <br />
                                - 다른 사람의 노력을 인정해줌
                            </Typography>
                    </Box>
                </Box>

                <Box style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
                    <Box style={{ display: "flex", flexDirection: "row" }}>
                        <Box boxShadow={2} style={{ width: "67%", padding: "10px", marginRight: "3%" }}>
                            <Typography variant="h6" color="primary" style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                사교형
                            </Typography>
                            <Typography variant="h6" color="primary" style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                (Influence,표현형)
                            </Typography>
                            <Typography variant="h6" color="primary" style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                12%분포
                            </Typography>
                            <Typography variant="h7" style={{ marginTop: "10px", display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
                                다른 사람을 설득하거나 영향을 미침으로써 스스로 환경을 조성한다.
                            </Typography>
                        </Box>
                        <Box style={{ width: "30%" }}>
                            <img src={iImg} style={{ width: "100%" }} />
                        </Box>
                    </Box>
                    <Box style={{ marginTop: "20px", width: "100%", padding: "10px", boxSizing: "border-box" }} boxShadow={2}>
                        <Typography variant="h6" color="primary" style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                            사교형(I)의 특징
                            </Typography>
                        <Typography variant="h7" style={{ marginTop: "10px", display: "flex", flexDirection: "row", justifyContent: "flex-start", paddingLeft: "15px" }}>
                            - 사람 지향적이다. <br />
                                - 사회적 인정에 의해 동기부여 된다. <br />
                                - 사람들로부터 배척당하는 것을 두려워 한다. <br />
                                - 압력하에서 일을 체계적으로 처리 못할 수 있다.
                            </Typography>
                    </Box>
                    <Box style={{ marginTop: "20px", width: "100%", padding: "10px", boxSizing: "border-box" }} boxShadow={2}>
                        <Typography variant="h6" color="primary" style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                            사교형(I)의 장단점
                            </Typography>
                        <Typography variant="h7" style={{ marginTop: "10px", display: "flex", flexDirection: "row", justifyContent: "flex-start", paddingLeft: "15px" }}>
                            장점: 낙관적이다. 인간적이다. 표현력이 좋다. 다른 사람들을 잘 설득한다. 즐거운 분위기를 만든다. 외향적이고 사람들을 잘 사귄다. 좋은 인상을 준다. 열정적이다.
                            </Typography>
                        <Typography variant="h7" style={{ marginTop: "10px", display: "flex", flexDirection: "row", justifyContent: "flex-start", paddingLeft: "15px" }}>
                            단점: 일의 끝마무리가 부족하다. 무리하게 약속을 한다. 너무 말을 많이 한다. 교묘한 말로 설득한다. 충동적으로 행동한다. 능력에 대한 과대평가를 한다. 급하게 결론을 내린다. 결과에 대해 지나치게 낙관적이다.
                            </Typography>
                    </Box>
                    <Box style={{ marginTop: "20px", width: "100%", padding: "10px", boxSizing: "border-box" }} boxShadow={2}>
                        <Typography variant="h6" color="primary" style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                            사교형(I)의 부족한점을 보완하려면..
                            </Typography>
                        <Typography variant="h7" style={{ marginTop: "10px", display: "flex", flexDirection: "row", justifyContent: "flex-start", paddingLeft: "15px" }}>
                            - 과제 완수할 때 과정을 구조화 <br />
                                - 단호하게 지시하는 능력 개발 <br />
                                - 타인의 부정적인 시각에 대한 배려 <br />
                                - 중요한 업무는 일관성 있게 마무리 <br />
                                - 자신의 시간관리를 평가해봄
                            </Typography>
                    </Box>
                </Box>

                <Box style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
                    <Box style={{ display: "flex", flexDirection: "row" }}>
                        <Box boxShadow={2} style={{ width: "67%", padding: "10px", marginRight: "3%" }}>
                            <Typography variant="h6" color="primary" style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                안정형
                            </Typography>
                            <Typography variant="h6" color="primary" style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                (Stability,온화형)
                            </Typography>
                            <Typography variant="h6" color="primary" style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                69%분포
                            </Typography>
                            <Typography variant="h7" style={{ marginTop: "10px", display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
                                과업을 수행하기 위해서 다른 사람과 협력한다.
                            </Typography>
                        </Box>
                        <Box style={{ width: "30%" }}>
                            <img src={sImg} style={{ width: "100%" }} />
                        </Box>
                    </Box>
                    <Box style={{ marginTop: "20px", width: "100%", padding: "10px", boxSizing: "border-box" }} boxShadow={2}>
                        <Typography variant="h6" color="primary" style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                            안정형(S)의 특징
                            </Typography>
                        <Typography variant="h7" style={{ marginTop: "10px", display: "flex", flexDirection: "row", justifyContent: "flex-start", paddingLeft: "15px" }}>
                            - 정해진 방식으로 수행한다. <br />
                                - 팀 지향적이다. <br />
                                - 현재의 상태를 안정적으로 유지하는 것에 동기부여 된다. <br />
                                - 안정성을 상실하고 변화하는 것을 두려워한다. <br />
                                - 압력하에서 지나치게 남을 위해 자신을 양보한다.
                            </Typography>
                    </Box>
                    <Box style={{ marginTop: "20px", width: "100%", padding: "10px", boxSizing: "border-box" }} boxShadow={2}>
                        <Typography variant="h6" color="primary" style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                            안정형(S)의 장단점
                            </Typography>
                        <Typography variant="h7" style={{ marginTop: "10px", display: "flex", flexDirection: "row", justifyContent: "flex-start", paddingLeft: "15px" }}>
                            장점: 협조적이다. 꾸준하다. 쉽게 동의한다. 작업수행이 안정되어 있다. 충성스럽다. 대인관계가 원만하다.
                            남을 잘 섬긴다. 다른 사람의 의견을 잘 들어준다.
                            </Typography>
                        <Typography variant="h7" style={{ marginTop: "10px", display: "flex", flexDirection: "row", justifyContent: "flex-start", paddingLeft: "15px" }}>
                            단점: 급격한 변화를 꺼린다. 갈등을 회피한다. 지나치게 관대하다.
                            감정을 잘 표현하지 않는다. 일을 미룬다. 능력에 대한 평가를 과대하게 한다. 우유부단하다. 정해진 기간에 일을 마치기 어렵다.
                            </Typography>
                    </Box>
                    <Box style={{ marginTop: "20px", width: "100%", padding: "10px", boxSizing: "border-box" }} boxShadow={2}>
                        <Typography variant="h6" color="primary" style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                            안정형(S)의 부족한점을 보완하려면..
                            </Typography>
                        <Typography variant="h67" style={{ marginTop: "10px", display: "flex", flexDirection: "row", justifyContent: "flex-start", paddingLeft: "15px" }}>
                            - 예측불가능한 상황 대처 능력 개발 <br />
                                - 주관적인 결단력을 키움 <br />
                                - 새로운 도전(변화)을 받아들임 <br />
                                - 반복된 일상업무에 융통성을 가지고 좀더 효과를 높이기 위한 다양한 방법을 찾아봄
                            </Typography>
                    </Box>
                </Box>

                <Box style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
                    <Box style={{ display: "flex", flexDirection: "row" }}>
                        <Box boxShadow={2} style={{ width: "67%", padding: "10px", marginRight: "3%" }}>
                            <Typography variant="h6" color="primary" style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                신중형
                            </Typography>
                            <Typography variant="h6" color="primary" style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                (Conscientiousness,분석형)
                            </Typography>
                            <Typography variant="h6" color="primary" style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                16%분포
                            </Typography>
                            <Typography variant="h7" style={{ marginTop: "10px", display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
                                업무의 품질과 정확성을 높이기 위해 기존의 환경안에서 신중하게 일한다.
                            </Typography>
                        </Box>
                        <Box style={{ width: "30%" }}>
                            <img src={cImg} style={{ width: "100%" }} />
                        </Box>
                    </Box>
                    <Box style={{ marginTop: "20px", width: "100%", padding: "10px", boxSizing: "border-box" }} boxShadow={2}>
                        <Typography variant="h6" color="primary" style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                            신중형(C)의 특징
                            </Typography>
                        <Typography variant="h7" style={{ marginTop: "10px", display: "flex", flexDirection: "row", justifyContent: "flex-start", paddingLeft: "15px" }}>
                            - 세부적인 사항에 주의를 기울이고, 분석적이다. <br />
                                - 과업지향적이다. <br />
                                - 정확성과 양질을 요구하는 것에 의해 동기부여된다. <br />
                                - 자신이 수행하는 작업에대해 비판 당하는것을 두려워한다. <br />
                                - 압력하에서 자기자신과 다른사람들에 대해 기대가 높고 지나치게 비판적일 수 있다.
                            </Typography>
                    </Box>
                    <Box style={{ marginTop: "20px", width: "100%", padding: "10px", boxSizing: "border-box" }} boxShadow={2}>
                        <Typography variant="h6" color="primary" style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                            신중형(C)의 장단점
                            </Typography>
                        <Typography variant="h7" style={{ marginTop: "10px", display: "flex", flexDirection: "row", justifyContent: "flex-start", paddingLeft: "15px" }}>
                            장점: 정리정돈을 잘한다. 철저하다. 유능하다. 외교적 수완이 있다.
                            자기 훈련을 잘한다. 분석적이다. 정확하다. 높은 기준을 가지고 있다.
                            </Typography>
                        <Typography variant="h7" style={{ marginTop: "10px", display: "flex", flexDirection: "row", justifyContent: "flex-start", paddingLeft: "15px" }}>
                            단점: 지나치게 조심스럽다. 자발성이 약하다. 세부적인 일에 얽매인다. 의심이 많다.
                            일하는 방법에 융통성이 없다. 비판에 예민하게 반응한다. 비판하기를 좋아한다. 비관적이다.
                            </Typography>
                    </Box>
                    <Box style={{ marginTop: "20px", width: "100%", padding: "10px", boxSizing: "border-box" }} boxShadow={2}>
                        <Typography variant="h6" color="primary" style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                            신중형(C)의 부족한점을 보완하려면..
                            </Typography>
                        <Typography variant="h7" style={{ marginTop: "10px", display: "flex", flexDirection: "row", justifyContent: "flex-start", paddingLeft: "15px" }}>
                            - 납기일과 높은 기준의 균형 <br />
                                - 자신의 업무평가에 대한 수용 <br />
                                - 타인을 평가할 때 감정적인 면을 고려하여 온건히 비판 <br />
                                - 자기감정을 표현하고 정보 공유 <br />
                                - 업무기준의 협상노력 <br />
                                - 자신의 완고함을 피함
                            </Typography>
                    </Box>
                </Box>

                <Box style={{ display: "flex", marginTop: "40px", flexDirection: "row", justifyContent: "center" }}>
                    <Typography variant="h6" style={{ fontWeight: "700" }}>
                        테스트 하는 방법
                    </Typography>
                </Box>
                <Box style={{ marginTop: "20px", padding: "10px", boxSizing: "border-box" }} boxShadow={2}>
                    <Typography variant="h7">
                        ※ 검사 문항 : 40문항<br /><br />
                        ※ 체크 사항 : 문항을 보고 자신과 배우자의 행동유형과 가장 가깝다고 생각하는 항목에 체크합니다.<br />
                        (오래 생각하지 마시고, 바로 떠오르는 행동유형에 체크해 주세요)<br /><br />
                        ※ 결과 및 분석<br />
                        &nbsp; (1) 부부의 행동유형 각각 분석<br />
                        &nbsp; (2) 배우자 연결 분석<br />
                        &nbsp; (3) 행동유형에 따른 긍정 부정
                    </Typography>
                </Box>
            </Box>
        );
    }
}

export default StartPageMain;