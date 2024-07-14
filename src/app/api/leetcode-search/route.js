import { NextResponse } from 'next/server';
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

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('keyword');

  if (!keyword) {
    return NextResponse.json({ error: 'Keyword is required' }, { status: 400 });
  }

  try {
    const data = await client.request(query, { keyword });
    return NextResponse.json(data.problemsetQuestionList.questions);
  } catch (error) {
    console.error('Error fetching LeetCode questions:', error);
    return NextResponse.json({ error: 'Failed to fetch LeetCode questions' }, { status: 500 });
  }
}