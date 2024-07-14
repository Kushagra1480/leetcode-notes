import { GraphQLClient, gql } from 'graphql-request';

const endpoint = 'https://leetcode.com/graphql';
const client = new GraphQLClient(endpoint);

const query = gql`
  query problemsetQuestionList($keyword: String) {
    problemsetQuestionList: questionList(
      categorySlug: ""
      limit: 5
      skip: 0
      filters: { searchKeywords: $keyword }
    ) {
      questions: data {
        titleSlug
        title
        difficulty
      }
    }
  }
`;

export async function searchLeetCodeQuestions(keyword) {
  try {
    const data = await client.request(query, { keyword });
    return data.problemsetQuestionList.questions;
  } catch (error) {
    console.error('Error fetching LeetCode questions:', error);
    return [];
  }
}