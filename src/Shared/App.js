import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import {
    Main, About, TestManage, ColumnManage, UserManage, AddPkg, AddCol, ee, ModifyPkg,
    SmsTest, TestStartPage, TestResult, CoupleManage, ColumnScreen, VideoManage, AddVideo, RevisePkg, Login
} from 'Pages';


class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/manage/" component={Main} />
                <Route exact path="/manage/about" component={About} />
                <Route exact path="/manage/TestManage" component={TestManage} />
                <Route exact path="/manage/TestManage/ModifyPkg/:srl" component={ModifyPkg} />
                <Route exact path="/manage/TestManage/RevisePkg/:srl" component={RevisePkg} />
                <Route exact path="/manage/ColumnManage" component={ColumnManage} />
                <Route exact path="/manage/UserManage" component={UserManage} />
                <Route exact path="/manage/CoupleManage" component={CoupleManage} />
                <Route exact path="/manage/TestManage/AddPkg" component={AddPkg} />
                <Route exact path="/manage/ColumnManage/AddCol" component={AddCol} />
                <Route exact path="/manage/ee/:pkgSrl/:id" component={ee} />
                <Route exact path="/manage/test/:id" component={SmsTest} />
                <Route exact path="/manage/TestStartPage/:pkgSrl/:id" component={TestStartPage} />
                <Route exact path="/manage/TestResult/:pkgSrl/:id/:count/:partnerCount" component={TestResult} />
                <Route exact path="/manage/ColumnScreen/:columnSrl" component={ColumnScreen} />
                <Route exact path="/manage/VideoManage/AddVideo" component={AddVideo} />
                <Route exact path="/manage/VideoManage" component={VideoManage} />
                <Route exact path="/manage/Login" component={Login} />
            </div>
        );
    }
}

export default App;
