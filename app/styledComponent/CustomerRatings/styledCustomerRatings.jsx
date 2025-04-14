import styled from "styled-components";

export const FeedbackContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eef3f8;
  height: 100vh;
`;

export const ImageContainer = styled.div`
  width: 40%;
  height: 455px;
  background: url("/ConnectUs.png") no-repeat center center/cover;
  border-radius: 10px 0 0 10px;
`;

export const FormContainer = styled.div`
  width: 35%;
  background: white;
  padding: 40px;
  border-radius: 12px ;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

export const FeedbackTitle = styled.h2`
  text-align: right;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  direction: rtl;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  direction: rtl;
  height: 100px;
  resize: none;
`;

export const SubmitButton = styled.button`
  width: 30%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #0056b3;
  }
`;
