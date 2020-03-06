import React, {Component} from 'react';
import {Text, View, ScrollView, FlatList, Modal, StyleSheet} from 'react-native';
import {Card, Icon, Input, Button} from 'react-native-elements';
import {DISHES} from "../shared/dishes";
import {COMMENTS} from "../shared/comments"
import {connect} from "react-redux"
import {baseUrl} from "../shared/baseUrl"
import {postComment, postFavorite} from "../redux/ActionCreators"
import {Rating} from "react-native-ratings"
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites,
        author: state.author,
        comment: state.comment,
        rating: state.dishes
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: ({dishId, rating, author, comment}) => dispatch(postComment(dishId, rating, author, comment))

})

function RenderComments(props) {

    const comments = props.comments;

    const renderCommentItem = ({item, index}) => {

        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };

    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title='Comments'>
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    );
}

function RenderDish(props) {

    const dish = props.dish;

    if (dish != null) {
        return (
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                <Card
                    featuredTitle={dish.name}
                    image={{uri: baseUrl + dish.image}}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <View style={styles.inRowCenter}>
                        <Icon
                            raised
                            reverse
                            name={props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                        />
                        <Icon
                            raised
                            reverse
                            name={'pencil'}
                            type='font-awesome'
                            color='#512DA8'
                            onPress={() => props.toggleModal()}
                        />
                    </View>
                </Card>
            </Animatable.View>
        );
    } else {
        return (<View/>);
    }
}

class DishDetail extends Component {

    constructor(props) {
        super(props);
        const dishId = this.props.navigation.getParam('dishId', '');
        this.defautValuesForm = {
            "dishId": dishId,
            "rating": 5,
            "comment": "",
            "author": "",
        }

        this.state = {
            favorites: [],
            showModal: false,
            formComment: {...this.defautValuesForm},
        }
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    resetForm() {
        this.setState({formComment: {...this.defautValuesForm}})
    }

    handleComment() {
        this.props.postComment(this.state.formComment);
        this.resetForm();
    }

    render() {
        const dishId = this.props.navigation.getParam('dishId', '');
        return (
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                            favorite={this.props.favorites.some(el => el === dishId)}
                            onPress={() => this.markFavorite(dishId)}
                            toggleModal={() => this.toggleModal()}
                />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)}/>
                <Modal animationType={"slide"} transparent={false}
                       visible={this.state.showModal}
                       onDismiss={() => this.toggleModal()}
                       onRequestClose={() => this.toggleModal()}>
                    <View style={styles.modal}>
                        <Rating
                            onFinishRating={value => this.setState({
                                formComment: {
                                    ...this.state.formComment,
                                    rating: value
                                }
                            })}
                            ratingCount={5}
                            imageSize={60}
                            showRating
                        />
                        <View style={{marginBottom: 30}}>
                            <Input
                                placeholder='Author'
                                leftIcon={<Icon name="user-o" type="font-awesome"/>}
                                onChangeText={value => this.setState({
                                    formComment: {
                                        ...this.state.formComment,
                                        author: value
                                    }
                                })}
                            />
                        </View>
                        <View style={{marginBottom: 30}}>
                            <Input
                                placeholder='Comment'
                                leftIcon={<Icon name="comment-o" type="font-awesome"/>}
                                onChangeText={value => this.setState({
                                    formComment: {
                                        ...this.state.formComment,
                                        comment: value
                                    }
                                })}
                            />
                        </View>
                        <Button
                            buttonStyle={{backgroundColor: '#512DA8'}}
                            containerStyle={{marginTop: 22}}
                            onPress={() => {
                                this.toggleModal();
                                this.handleComment()
                            }}
                            title='SUBMIT'
                            color='#512DA8'
                        />
                        <Button
                            containerStyle={{marginTop: 22}}
                            buttonStyle={{backgroundColor: 'gray'}}
                            onPress={() => {
                                this.toggleModal();
                                this.resetForm()
                            }}
                            title='CANCEL'
                        /></View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    },
    inRowCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);