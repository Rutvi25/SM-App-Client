import React from 'react';
import gql from 'graphql-tag';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';

import { useForm } from '../utils/hooks';
import { FETCH_POSTS_QUERY } from '../utils/graphql';

function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: '',
  });
  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      });
      values.body = '';
    },
  });
  function createPostCallback() {
    createPost();
  }
  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a Post</h2>
        <Form.Field>
          <Form.Input
            placeholder='Hello All!'
            name='body'
            onChange={onChange}
            value={values.body}
          />
          <Button type='submit' color='teal'>
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className='ui error message' style={{ marginBottom: 20 }}>
          <ul className='list'>
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        createdAt
        username
      }
      likeCount
      comments {
        id
        createdAt
        username
        body
      }
      commentCount
    }
  }
`;

export default PostForm;
