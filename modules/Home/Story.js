import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, Button } from 'react-native';

const Story = () => {
    const [status, setStatus] = React.useState('');

    const posts = [
        {
            id: 1,
            user: {
                name: 'John Doe',
                avatar: 'https://i.pravatar.cc/150?img=1',
            },
            content: 'Chuyến đi du lịch tuyệt vời tới bãi biển!',
            images: ['https://placeimg.com/640/480/nature', 'https://placeimg.com/640/480/arch'],
        },
        {
            id: 2,
            user: {
                name: 'Jane Smith',
                avatar: 'https://i.pravatar.cc/150?img=2',
            },
            content: 'Bữa tối hôm nay thật ngon!',
            images: ['https://placeimg.com/640/480/food'],
        },
        {
            id: 3,
            user: {
                name: 'Alice Johnson',
                avatar: 'https://i.pravatar.cc/150?img=3',
            },
            content: 'Thật vui khi gặp lại các bạn cũ!',
            images: ['https://placeimg.com/640/480/people'],
        },
        {
            id: 4,
            user: {
                name: 'Bob Brown',
                avatar: 'https://i.pravatar.cc/150?img=4',
            },
            content: 'Hoàng hôn đẹp quá!',
            images: ['https://placeimg.com/640/480/nature'],
        },
        {
            id: 5,
            user: {
                name: 'Charlie Davis',
                avatar: 'https://i.pravatar.cc/150?img=5',
            },
            content: 'Tận hưởng cuối tuần cùng gia đình.',
            images: ['https://placeimg.com/640/480/tech'],
        },
    ];

    const stories = [
        {
            id: 1,
            user: {
                name: 'Alice',
                avatar: 'https://i.pravatar.cc/150?img=3',
            },
            image: 'https://placeimg.com/640/480/people',
        },
        {
            id: 2,
            user: {
                name: 'Bob',
                avatar: 'https://i.pravatar.cc/150?img=4',
            },
            image: 'https://placeimg.com/640/480/tech',
        },
        {
            id: 3,
            user: {
                name: 'Charlie',
                avatar: 'https://i.pravatar.cc/150?img=5',
            },
            image: 'https://placeimg.com/640/480/nature',
        },
        {
            id: 4,
            user: {
                name: 'David',
                avatar: 'https://i.pravatar.cc/150?img=6',
            },
            image: 'https://placeimg.com/640/480/arch',
        },
        {
            id: 5,
            user: {
                name: 'Emma',
                avatar: 'https://i.pravatar.cc/150?img=7',
            },
            image: 'https://placeimg.com/640/480/animals',
        },
    ];

    const postStatus = () => {
        if (status.trim()) {
            const newPost = {
                id: posts.length + 1,
                user: {
                    name: 'Myself',
                    avatar: 'https://i.pravatar.cc/150?img=8',
                },
                content: status,
                images: [],
            };
            posts.unshift(newPost);
            setStatus('');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.logo}>HALLO</Text>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm kiếm trên HALLO"
                />
            </View>
            <ScrollView style={styles.scrollView}>
                <View style={styles.statusContainer}>
                    <Image
                        source={{ uri: 'https://i.pravatar.cc/150?img=8' }}
                        style={styles.avatar}
                    />
                    <TextInput
                        style={styles.statusInput}
                        placeholder="Bạn đang nghĩ gì?"
                        multiline={true}
                        numberOfLines={3}
                        value={status}
                        onChangeText={setStatus}
                    />
                    <Button title="Đăng" onPress={postStatus} />
                </View>
                <View style={styles.storySection}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {stories.map(story => (
                            <TouchableOpacity key={story.id} style={styles.storyItem}>
                                <Image source={{ uri: story.image }} style={styles.storyImage} />
                                <Text style={styles.storyName}>{story.user.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
                {posts.map(post => (
                    <View key={post.id} style={styles.postContainer}>
                        <View style={styles.postHeader}>
                            <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
                            <Text style={styles.username}>{post.user.name}</Text>
                        </View>
                        <Text style={styles.content}>{post.content}</Text>
                        {post.images.map((image, index) => (
                            <Image key={index} source={{ uri: image }} style={styles.image} />
                        ))}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f2f5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: '#fff',
    },
    logo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#3b5998',
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        paddingHorizontal: 10,
        marginLeft: 10,
        backgroundColor: '#f0f2f5',
    },
    scrollView: {
        flex: 1,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    statusInput: {
        flex: 1,
        height: 80,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        paddingHorizontal: 10,
        backgroundColor: '#f0f2f5',
        marginLeft: 10,
        marginRight: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    storySection: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    storyItem: {
        marginRight: 10,
        alignItems: 'center',
    },
    storyImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 5,
    },
    storyName: {
        fontSize: 12,
        color: '#000',
    },
    postContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginVertical: 5,
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 2,
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    username: {
        fontWeight: 'bold',
        marginLeft: 10,
    },
    content: {
        fontSize: 16,
        marginBottom: 10,
    },
    image: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 10,
        marginBottom: 10,
    },
});

export default Story;
