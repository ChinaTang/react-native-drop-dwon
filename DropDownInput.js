import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactNative,{
    Modal,
    TouchableOpacity,
    Text,
    Dimensions,
    UIManager,
    View,
} from 'react-native'
let winWidth = Dimensions.get('window').width;
let winHeigth = Dimensions.get('window').height;

/**
 * 布局View已经为你左对齐，通过dropDownView函数返回你将要展示的控件, 弹框的宽度和高度与你的父布局无关
 * 弹框是定义在一个与屏幕大小相同的布局中，左边与按钮，
 */
export default class DropDownInput extends Component{


    static propTypes = {
        buttonStyle:PropTypes.object,
        dropViewStyle:PropTypes.object,
        text:PropTypes.string,
        textStyle:PropTypes.object,
        dropDownView:PropTypes.func,
    }

    static defaultProps = {
        text:'请选择',
        dropViewStyle:{width:winWidth / 2
            ,height: 40
            ,borderWidth:0.5,
            borderColor:'black',
            backgroundColor: '#fff',
            marginRight: 10},
        buttonStyle:{width:winWidth / 2,height: 40},
        dropDownView:null,
    }

    constructor(){
        super();
        this.state={
            x:0,
            y:0,
            w:0,
            h:0,
            px:0,
            py:0,
            addVisible:false,
        }
    }


    render(){
        console.log('DropDownInput====render');
        return(
                <TouchableOpacity style={this.props.buttonStyle}
                    onPress={()=>{this.setState({addVisible:true}); UIManager.measure(
                        ReactNative.findNodeHandle(this.refs['DropDown']),
                        (x, y, w, h, px, py)=>{this.setState({
                            x:x,
                            y:y,
                            px:px,
                            py:py,
                            w:w,
                            h:h,
                        }); console.log(x, y, w, h)})}}
                    ref = 'DropDown'>
                    <Text>{this.props.text}</Text>
                    {this._renderDrowModal()}
                </TouchableOpacity>

        );
    }


    /**
     * 布局View已经为你左对齐，通过dropDownView函数返回你将要展示的控件, 弹框的宽度和高度与你的父布局无关
     * 弹框是定义在一个与屏幕大小相同的布局中，左边与按钮，
     * @returns {XML}
     * @private
     */
    _renderDrowModal(){
        console.log(this.state.px, this.state.py, this.props.buttonStyle);
        return(<Modal
                      transparent={true}
                      visible={this.state.addVisible}>
            <TouchableOpacity style={{width:winWidth, height:winHeigth}} onPress={()=>{this.setState({addVisible:false})}}>
                <View style={[{position:'absolute', top:this.state.py + this.state.h + 10
                    , left:this.state.px, width:this.state.w}
                    , this.props.dropViewStyle]}>

                {this.props.dropDownView != null ? this.props.dropDownView : <View/>}

                </View>

            </TouchableOpacity>
        </Modal>)
    }

}
